import TelegramBot, { Message } from 'node-telegram-bot-api';
import { findUser } from 'controllers/user.controller';
import { createTransaction } from 'controllers/transaction.controller';
import {
  createExchangeTransaction,
  getEstimatedExchangeAmount,
  getMinimalExchangeAmount,
} from 'services/change-now';
import store from 'store';
import { ConfirmKeyboard } from './keyboard';

export const handleInputAmount = async (
  bot: TelegramBot,
  msg: Message,
  inputAmount: number,
) => {
  const chatId = msg.chat.id;
  const settings = store.getSetting(chatId);

  const { inputCurrency, outputCurrency } = settings;

  const minimalExchangeAmount = await getMinimalExchangeAmount(
    inputCurrency.ticker,
    outputCurrency.ticker,
  );

  if (inputAmount < minimalExchangeAmount) {
    bot.sendMessage(chatId, 'Oops! Wrong amount.');

    bot.sendMessage(
      chatId,
      `Enter the amount of <b>${inputCurrency.ticker.toUpperCase()}</b> you would like to exchange.\nMinimal amount - <b>${minimalExchangeAmount}</b>`,
    );
    return;
  }

  const exchangeData = await getEstimatedExchangeAmount(
    inputCurrency.ticker,
    outputCurrency.ticker,
    inputAmount,
  );

  store.setSetting(chatId, { inputAmount, exchangeData });

  bot.sendMessage(
    chatId,
    `Selected pair <b>${inputCurrency.ticker.toUpperCase()} - ${outputCurrency.ticker.toUpperCase()}</b>.
You're sending <b>${inputAmount} ${inputCurrency.ticker.toUpperCase()}</b>; you'll get <b>~${exchangeData.estimatedAmount} ${outputCurrency.ticker.toUpperCase()}</b>.
Enter the recipient <b>${outputCurrency.ticker.toUpperCase()}</b> wallet address.`,
    {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [[]],
      },
    },
  );
};

export const handleOutputAmount = async (
  bot: TelegramBot,
  msg: Message,
  recipientAddress: string,
) => {
  const chatId = msg.chat.id;
  const settings = store.getSetting(chatId);

  const { inputCurrency, outputCurrency, inputAmount, exchangeData } = settings;

  store.setSetting(chatId, { recipientAddress });

  const { keyboard } = handleOutputAmount.getMessage();

  bot.sendMessage(
    chatId,
    `Selected pair <b>${inputCurrency.ticker.toUpperCase()} - ${outputCurrency.ticker.toUpperCase()}</b>.
You're sending <b>${inputAmount} ${inputCurrency.ticker.toUpperCase()}</b>; you'll get <b>~${exchangeData.estimatedAmount} ${outputCurrency.ticker.toUpperCase()}</b>.
Your recipient <b>${outputCurrency.ticker.toUpperCase()}</b> wallet address is <b>${recipientAddress}</b>

Please make sure all the information you’ve entered is correct. Then tap the Confirm button below.`,
    {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard,
      },
    },
  );
};

handleOutputAmount.getMessage = () => {
  return {
    keyboard: ConfirmKeyboard(),
  };
};

export const handleConfirm = async (bot: TelegramBot, msg: Message) => {
  const chatId = msg.chat.id;
  const settings = store.getSetting(chatId);

  const {
    inputCurrency,
    outputCurrency,
    inputAmount,
    recipientAddress,
    exchangeData,
  } = settings;

  const transaction = await createExchangeTransaction(
    inputCurrency.ticker,
    outputCurrency.ticker,
    inputAmount,
    recipientAddress,
  );

  if (transaction.error) {
    bot.sendMessage(chatId, transaction.message);
    return;
  }

  const user = await findUser(chatId);

  createTransaction({ userId: user.id, transactionId: transaction.id });

  bot.sendMessage(
    chatId,
    `You're sending <b>${inputAmount} ${inputCurrency.ticker.toUpperCase()}</b>; you'll get <b>~${exchangeData.estimatedAmount} ${outputCurrency.ticker.toUpperCase()}</b>.
Here is the deposit address for your exchange.
In order to start the exchange, use your wallet to send your deposit to this address.`,
    {
      parse_mode: 'HTML',
    },
  );
  bot.sendMessage(chatId, transaction.payinAddress);
  bot.sendMessage(chatId, `Transaction ID - ${transaction.id}`);
  bot.sendMessage(
    chatId,
    `click to ping your transaction:\n/status_${transaction.id}`,
  );
  bot.sendMessage(
    chatId,
    'We are waiting for your coins to be received. No pressure, though. Keep in mind - we will update the status when the deposit is received.',
  );
};
