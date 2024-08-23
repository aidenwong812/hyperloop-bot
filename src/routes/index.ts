import type TelegramBot from 'node-telegram-bot-api';

import startRouter from './start.route';
import exchangeRouter from './exchange.route';
import currencyRouter from './currency.route';
import statusRouter from './status.route';

// const startRouter = require('./start.route');
// const tokenRouter = require('./token.route');
// const manageRouter = require('./manage.route');
// const buyRouter = require('./buy.route');
// const sellRouter = require('./sell.route');
// const walletRouter = require('./wallet.route');
// const withdrawRouter = require('./withdraw.route');
// const settingsRouter = require('./settings.route');
// const referralsRouter = require('./referrals.route');
// const helpRouter = require('./help.route');

export const router = (bot: TelegramBot) => {
  startRouter(bot);
  exchangeRouter(bot);
  currencyRouter(bot);
  statusRouter(bot);
  // tokenRouter(bot);
  // manageRouter(bot);
  // buyRouter(bot);
  // sellRouter(bot);
  // walletRouter(bot);
  // withdrawRouter(bot);
  // settingsRouter(bot);
  // referralsRouter(bot);
  // helpRouter(bot);

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
