import type TelegramBot from 'node-telegram-bot-api';

import startRouter from './start.route';
import exchangeRouter from './exchange.route';
import currencyRouter from './currency.route';
import statusRouter from './status.route';
import helpRouter from './help.route';

export const router = (bot: TelegramBot) => {
  startRouter(bot);
  exchangeRouter(bot);
  currencyRouter(bot);
  statusRouter(bot);
  helpRouter(bot);

  bot.on('callback_query', query => {
    if (query) {
      const data = query.data?.split(' ') || [];

      const chatId = query.message?.chat.id || 0;
      const messageId = query.message?.message_id || 0;

      switch (data[0]) {
        case 'close':
          bot.deleteMessage(chatId, messageId);
          break;
        default:
          break;
      }
      bot.answerCallbackQuery(query.id);
    }
  });

  bot.on('polling_error', e => {
    // eslint-disable-next-line no-console
    console.error(e);
  });
};
