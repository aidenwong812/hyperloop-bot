import TelegramBot, { Message } from 'node-telegram-bot-api';
import { getTransactionStatus } from 'services/change-now';
import store from 'store';

export const checkTransactionStatus = async (
  bot: TelegramBot,
  msg: Message,
  transactionId: string,
) => {
  const chatId = msg.chat.id;

  const transactionStatus = await getTransactionStatus(transactionId);

  bot.sendMessage(chatId, `Your transaction status is ${transactionStatus}.`);
};

export const checkPoints = async (bot: TelegramBot, msg: Message) => {
  const chatId = msg.chat.id;

  const user = store.getUser(chatId);

  if (user) {
    bot.sendMessage(chatId, `You have ${user.airdrop} points.`);
  }
};
