import TelegramBot, { Message } from 'node-telegram-bot-api';

import { createUser, findUser } from 'controllers/user.controller';
import { trim } from 'utils';
import * as fs from 'fs';
import path from 'path';

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
  }

  const { message, keyboard } = await start.getMessage();

  const WelcomePhoto = fs.readFileSync(path.resolve('src/assets/splash.jpg'));

  bot.sendPhoto(chatId, WelcomePhoto, {
    caption: message,
    parse_mode: 'HTML',
    reply_markup: {
      keyboard,
    },
  });
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
