import TelegramBot, { Message } from 'node-telegram-bot-api';
import { getTransactionStatus } from 'services/change-now';

export const checkTransactionStatus = async (
  bot: TelegramBot,
  msg: Message,
  transactionId: string,
) => {
  const chatId = msg.chat.id;

  const transactionStatus = await getTransactionStatus(transactionId);

  bot.sendMessage(chatId, `Your transaction status is ${transactionStatus}.`);
};
