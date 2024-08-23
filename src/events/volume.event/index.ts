import TelegramBot from 'node-telegram-bot-api';
import { trim } from 'utils';

import store from 'store';
import { boostVolumeKeyboard, boostVolumeModeKeyboard } from './keyboards';
import { boostVolumeMessage, boostVolumeModeMessage } from './messages';

export const boostVolume = async (bot: TelegramBot, chatId: number) => {
  const { message, keyboard } = boostVolume.getMessage();

  bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
};

export const boostVolumeMode = async (
  bot: TelegramBot,
  chatId: number,
  params: any,
) => {
  const { mode } = params;
  store.setSetting(chatId, { operationMode: mode });

  const { message, keyboard } = boostVolumeMode.getMessage();

  bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
};

boostVolume.getMessage = () => {
  return {
    message: trim(boostVolumeMessage()),
    keyboard: boostVolumeKeyboard(),
  };
};

boostVolumeMode.getMessage = () => {
  return {
    message: trim(boostVolumeModeMessage()),
    keyboard: boostVolumeModeKeyboard(),
  };
};
