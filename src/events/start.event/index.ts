import TelegramBot, { Message } from 'node-telegram-bot-api';

import { SettingsNotFoundError, WalletNotFoundError } from 'errors/common';
import { createUser, findUser } from 'controllers/user.controller';
import { createSettings, findSettings } from 'controllers/settings.controller';
import { createWallet, findWallet } from 'controllers/wallet.controller';
import { trim } from 'utils';

import { WelcomeMessage } from './messages';
import { startKeyboard } from './keyboards';

export const start = async (bot: TelegramBot, msg: Message, params: any) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username || '';
  const { code } = params;

  if (findUser(chatId) === null) {
    await createUser(chatId, username, code);
    await createWallet(chatId);
    await createSettings(chatId);
  }

  const wallet = findWallet(chatId);
  if (wallet === null) {
    // eslint-disable-next-line no-console
    console.error(WalletNotFoundError);
    return;
  }

  const { message, keyboard } = await start.getMessage();

  bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });

  const settings = await findSettings(chatId);
  if (settings === null) {
    // eslint-disable-next-line no-console
    console.error(SettingsNotFoundError);
  }
};

start.getMessage = async () => {
  return {
    message: trim(WelcomeMessage()),
    keyboard: startKeyboard(),
  };
};
