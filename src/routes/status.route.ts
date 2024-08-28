import {
  checkAllTransactionStatus,
  checkPoints,
  checkTransactionStatus,
} from 'events/status.event';
import type TelegramBot from 'node-telegram-bot-api';

import store from 'store';

const statusRouter = (bot: TelegramBot) => {
  bot.onText(/^\/status_(\w+)?$/, (msg, match) => {
    store.clearSetting(msg.chat.id);
    if (match && match[1]) {
      checkTransactionStatus(bot, msg, match[1]);
    }
  });

  bot.on('message', msg => {
    const chatId = msg.chat.id;
    const { text } = msg;

    if (!text) {
      return;
    }

    if (text.startsWith('/')) {
      return;
    }

    if (text === 'Check Status') {
      store.clearSetting(chatId);
      checkAllTransactionStatus(bot, msg);
    }
  });

  bot.onText(/^\/points/, msg => {
    checkPoints(bot, msg);
  });
};

export default statusRouter;
