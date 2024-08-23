import type TelegramBot from 'node-telegram-bot-api';

import { start } from 'events/start.event';
import store from 'store';

const startRouter = (bot: TelegramBot) => {
  bot.onText(/^\/start(?: ref_(\w+))?$/, (msg, match) => {
    store.clearSetting(msg.chat.id);
    match
      ? start(bot, msg, { code: match[1] ?? '' })
      : start(bot, msg, { code: '' });
  });

  bot.on('callback_query', async query => {
    const data = query.data?.split(' ') || [];

    switch (data[0]) {
      case 'return':
        if (query.message) {
          start(bot, query.message, {});
        }
        break;
      default:
    }
  });
};

export default startRouter;
