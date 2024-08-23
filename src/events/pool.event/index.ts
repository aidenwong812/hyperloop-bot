import { PublicKey } from '@solana/web3.js';
import TelegramBot from 'node-telegram-bot-api';

import { trim } from 'utils';
import store from 'store';
import { validateMarketId } from 'features/pool.feature';
import {
  getPoolLoadingMessage,
  getPackageMessage,
  getInvalidPoolMessage,
} from './messages';
import { getPackageKeyboard } from './keyboards';

export const getPool = async (
  bot: TelegramBot,
  chatId: number,
  marketId: string,
) => {
  const { invalidPoolMessage, loadingMessage, message, keyboard } =
    getPool.getMessage(chatId, marketId);

  bot.sendMessage(chatId, loadingMessage);

  const isValid = await validateMarketId(new PublicKey(marketId));

  if (!isValid) {
    bot.sendMessage(chatId, invalidPoolMessage);
    return;
  }

  store.setSetting(chatId, { marketId });
  bot.sendMessage(chatId, message, {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
};

getPool.getMessage = (chatId: number, marketId: string) => {
  return {
    loadingMessage: trim(getPoolLoadingMessage()),
    invalidPoolMessage: trim(getInvalidPoolMessage()),
    message: trim(getPackageMessage(chatId, marketId)),
    keyboard: getPackageKeyboard(),
  };
};
