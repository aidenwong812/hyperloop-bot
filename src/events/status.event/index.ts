import TelegramBot, { Message } from 'node-telegram-bot-api';
import { findUser, updateUser } from 'controllers/user.controller';
import { calculateAirdropPoint } from 'features/status.feature';
import { getTransactionStatus } from 'services/change-now';
import store from 'store';
import {
  findAllTransactions,
  updateTransaction,
} from 'controllers/transaction.controller';

export const checkTransactionStatus = async (
  bot: TelegramBot,
  msg: Message,
  transactionId: string,
) => {
  const chatId = msg.chat.id;

  const transactionStatus = await getTransactionStatus(transactionId);

  const user = await findUser(chatId);
  if (transactionStatus.status === 'finished') {
    const airdropPoint = await calculateAirdropPoint(
      transactionStatus.fromCurrency,
      transactionStatus.amountSend,
    );
    updateUser(user.id, { airdrop: user.airdrop + airdropPoint });
  }

  bot.sendMessage(
    chatId,
    `Your transaction status is ${transactionStatus.status}.`,
  );
};

export const checkAllTransactionStatus = async (
  bot: TelegramBot,
  msg: Message,
) => {
  const chatId = msg.chat.id;

  const transactions = await findAllTransactions();

  const userTransactions = transactions.filter(
    one => Number(one.userId) === chatId && one.isValid,
  );

  userTransactions.map(async transaction => {
    const transactionStatus = await getTransactionStatus(
      transaction.transactionId,
    );

    const user = await findUser(chatId);
    if (transactionStatus.status === 'finished') {
      const airdropPoint = await calculateAirdropPoint(
        transactionStatus.fromCurrency,
        transactionStatus.amountSend,
      );
      updateUser(user.id, { airdrop: user.airdrop + airdropPoint });
      updateTransaction(transactionStatus.id, { isValid: false });
    }

    bot.sendMessage(
      chatId,
      `Your transaction status is ${transactionStatus.status}.`,
    );
  });
};

export const checkPoints = async (bot: TelegramBot, msg: Message) => {
  const chatId = msg.chat.id;

  const user = store.getUser(chatId);

  if (user) {
    bot.sendMessage(chatId, `You have ${user.airdrop} points.`);
  }
};
