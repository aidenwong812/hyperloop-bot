import TelegramBot, { Message } from 'node-telegram-bot-api';

import { SettingsNotFoundError, WalletNotFoundError } from 'errors/common';
import { createUser, findUser } from 'controllers/user.controller';
import { createSettings, findSettings } from 'controllers/settings.controller';
import { createWallet, findWallet } from 'controllers/wallet.controller';
import { trim } from 'utils';

import {
  CheckCurrenciesMessage,
  StartExchangeMessage,
  WelcomeMessage,
} from './messages';
import { StartExchangeKeyboard, StartKeyboard } from './keyboards';

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
      keyboard,
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
    keyboard: StartKeyboard(),
  };
};

export const startExchange = async (bot: TelegramBot, msg: Message) => {
  const chatId = msg.chat.id;

  const { checkMessage, startExchangeMessage, keyboard } =
    await startExchange.getMessage();

  await bot.sendMessage(chatId, checkMessage, {
    parse_mode: 'HTML',
  });

  await bot.sendMessage(chatId, startExchangeMessage, {
    parse_mode: 'HTML',
    reply_markup: {
      keyboard,
    },
  });
};

startExchange.getMessage = async () => {
  return {
    checkMessage: trim(CheckCurrenciesMessage()),
    startExchangeMessage: trim(StartExchangeMessage()),
    keyboard: StartExchangeKeyboard(),
  };
};
