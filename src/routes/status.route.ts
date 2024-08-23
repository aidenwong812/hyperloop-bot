import { checkTransactionStatus } from 'events/status.event';
import type TelegramBot from 'node-telegram-bot-api';

import store from 'store';

const statusRouter = (bot: TelegramBot) => {
  bot.onText(/^\/status_(\w+)?$/, (msg, match) => {
    store.clearSetting(msg.chat.id);
    if (match && match[1]) {
      checkTransactionStatus(bot, msg, match[1]);
    }
  });
};

export default statusRouter;
