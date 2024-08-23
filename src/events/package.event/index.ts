import TelegramBot, { Message } from 'node-telegram-bot-api';

import { trim } from 'utils';
import store from 'store';
import { MicroPackages } from 'constants/consts';
import { waitForFunds } from 'features/wallet.feature';
import {
  acceptMicroBotMessage,
  declineMicroBotMessage,
  selectAdditionalPackageMessage,
  selectPackageMessage,
} from './messages';
import {
  acceptMicroBotKeyboard,
  declineMicroBotKeyboard,
  selectPackageKeyboard,
} from './keyboards';

export const selectPackage = async (
  bot: TelegramBot,
  msg: Message,
  params: { mode: string },
) => {
  const { mode } = params;
  store.setSetting(msg.chat.id, { mainPackage: mode });

  const { message, keyboard } = selectPackage.getMessage(mode);

  bot.sendMessage(msg.chat.id, message, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
};

selectPackage.getMessage = (mode: string) => {
  return {
    message: trim(selectPackageMessage(mode)),
    keyboard: selectPackageKeyboard(),
  };
};

export const selectMicroBot = async (
  bot: TelegramBot,
  msg: Message,
  params: { mode: string },
) => {
  const settings = store.getSetting(msg.chat.id);
  const { mode } = params;
  const {
    acceptMessage,
    acceptKeyboard,
    declineMessage,
    declineKeyboard,
    selectAdditionalMessage,
    selectKeyboard,
  } = selectMicroBot.getMessage(msg.chat.id);

  const newSetting = settings?.microPackage
    ? [...settings.microPackage, ...[mode]]
    : [mode];

  const microPackageName = newSetting.map(pack => MicroPackages[pack]?.name);
  const additionalPackageKeyboard = acceptKeyboard.filter(
    one => !microPackageName.includes(one[0].text),
  );

  switch (mode) {
    case 'decline':
      bot.sendMessage(msg.chat.id, declineMessage, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: declineKeyboard,
        },
      });
      waitForFunds(bot, msg.chat.id);
      return;
    case 'accept':
      bot.sendMessage(msg.chat.id, acceptMessage, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: additionalPackageKeyboard,
        },
      });
      break;
    case 'A':
    case 'B':
    case 'C':
    case 'D':
    case 'E':
    case 'F':
      store.setSetting(msg.chat.id, {
        microPackage: newSetting,
      });
      bot.sendMessage(msg.chat.id, selectAdditionalMessage, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: selectKeyboard,
        },
      });
      break;
    default:
      break;
  }
};

selectMicroBot.getMessage = (chatId: number) => {
  return {
    acceptMessage: trim(acceptMicroBotMessage()),
    acceptKeyboard: acceptMicroBotKeyboard(),
    declineMessage: trim(declineMicroBotMessage(chatId)),
    declineKeyboard: declineMicroBotKeyboard(),
    selectAdditionalMessage: trim(selectAdditionalPackageMessage()),
    selectKeyboard: selectPackageKeyboard(),
  };
};
