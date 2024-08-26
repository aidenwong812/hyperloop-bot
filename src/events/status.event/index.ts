import TelegramBot, { Message } from 'node-telegram-bot-api';
// import {
//   findTransaction,
//   updateTransaction,
// } from 'controllers/transaction.controller';
import { getTransactionStatus } from 'services/change-now';
import store from 'store';

export const checkTransactionStatus = async (
  bot: TelegramBot,
  msg: Message,
  transactionId: string,
) => {
  const chatId = msg.chat.id;

  // const transaction = await findTransaction(transactionId);
  // if (transaction && !transaction.isValid) {
  //   bot.sendMessage(chatId, `Your transaction ${transactionId} is expired.`);
  //   return;
  // }

  const transactionStatus = await getTransactionStatus(transactionId);

  // if (
  //   transactionStatus.status === 'new' ||
  //   transactionStatus.status === 'waiting'
  // ) {
  //   if (new Date(transactionStatus.validUntil).getTime() < Date.now()) {
  //     bot.sendMessage(
  //       chatId,
  //       `Your transaction ${transactionStatus.id} is expired.`,
  //     );
  //     updateTransaction(transactionStatus.id, { isValid: false });
  //     return;
  //   }
  // }

  bot.sendMessage(
    chatId,
    `Your transaction status is ${transactionStatus.status}.`,
  );
};

export const checkPoints = async (bot: TelegramBot, msg: Message) => {
  const chatId = msg.chat.id;

  const user = store.getUser(chatId);

  if (user) {
    bot.sendMessage(chatId, `You have ${user.airdrop} points.`);
  }
};
