import TelegramBot, { Message } from 'node-telegram-bot-api';

import { selectCurrency } from 'features/currency.feature';
import { getMinimalExchangeAmount } from 'services/change-now';
import { trim } from 'utils';
import store from 'store';

import { CheckCurrenciesMessage, StartExchangeMessage } from './messages';
import { StartExchangeKeyboard } from './keyboards';

export const selectInputCurrency = async (
  bot: TelegramBot,
  msg: Message,
  currency: string,
) => {
  const chatId = msg.chat.id;

  let selectedCurrency = [];

  if (
    currency === 'Ethereum (ETH)' ||
    currency === 'Tron (TRX)' ||
    currency === 'Solana (SOL)' ||
    currency === 'Sui (Sui)'
  ) {
    selectedCurrency = await selectCurrency(currency.split(' ')[0]);
  } else {
    selectedCurrency = await selectCurrency(currency);
  }

  // if (currency.includes('(') && currency.includes(')')) {
  //   const [name, symbol] = currency.split('(');

  //   selectedCurrency = await selectCurrency(
  //     trim(name.replace(')', '')),
  //     trim(symbol.replace(')', '')),
  //   );
  // } else {
  //   selectedCurrency = await selectCurrency(trim(currency));
  // }

  if (selectedCurrency.length > 0) {
    store.setSetting(chatId, { inputCurrency: selectedCurrency[0] });

    const { startExchangeMessage, keyboard } =
      await selectInputCurrency.getMessage(chatId);

    bot.sendMessage(
      chatId,
      `Selected Currency - <b>${selectedCurrency[0].ticker.toUpperCase()}</b>`,
      {
        parse_mode: 'HTML',
      },
    );

    bot.sendMessage(chatId, startExchangeMessage, {
      reply_markup: {
        keyboard,
      },
    });
  } else {
    bot.sendMessage(chatId, 'Not supported currency.');
  }
};

selectInputCurrency.getMessage = async (chatId: number) => {
  return {
    startExchangeMessage: trim(StartExchangeMessage()),
    keyboard: StartExchangeKeyboard(chatId),
  };
};

export const selectOutputCurrency = async (
  bot: TelegramBot,
  msg: Message,
  currency: string,
) => {
  const chatId = msg.chat.id;

  let selectedCurrency = [];

  if (
    currency === 'Ethereum (ETH)' ||
    currency === 'Tron (TRX)' ||
    currency === 'Solana (SOL)' ||
    currency === 'Sui (Sui)'
  ) {
    selectedCurrency = await selectCurrency(currency.split(' ')[0]);
  } else {
    selectedCurrency = await selectCurrency(currency);
  }

  if (selectedCurrency.length > 0) {
    const settings = store.getSetting(chatId);

    const inputCurrency = settings.inputCurrency.ticker;
    store.setSetting(chatId, { outputCurrency: selectedCurrency[0] });

    bot.sendMessage(
      chatId,
      `Selected Currency - <b>${selectedCurrency[0].ticker.toUpperCase()}</b>`,
      {
        parse_mode: 'HTML',
      },
    );

    const minimalExchangeAmount = await getMinimalExchangeAmount(
      inputCurrency,
      selectedCurrency[0].ticker,
    );

    bot.sendMessage(
      chatId,
      `Enter the amount of ${inputCurrency.toUpperCase()} you would like to exchange.\nMinimal amount - <b>${minimalExchangeAmount}</b>`,
      {
        parse_mode: 'HTML',
      },
    );
  } else {
    bot.sendMessage(chatId, 'Not supported currency.');
  }
};

export const startExchange = async (bot: TelegramBot, msg: Message) => {
  const chatId = msg.chat.id;

  store.setSetting(chatId, { start: true });

  const { checkMessage, startExchangeMessage, keyboard } =
    await startExchange.getMessage(chatId);

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

startExchange.getMessage = async (chatId: number) => {
  return {
    checkMessage: trim(CheckCurrenciesMessage()),
    startExchangeMessage: trim(StartExchangeMessage()),
    keyboard: StartExchangeKeyboard(chatId),
  };
};
