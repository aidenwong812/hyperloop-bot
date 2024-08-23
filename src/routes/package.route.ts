import TelegramBot from 'node-telegram-bot-api';

import { selectMicroBot, selectPackage } from 'events/package.event';

const packageRouter = (bot: TelegramBot) => {
  bot.on('callback_query', query => {
    if (!query.message || !query.data) {
      return;
    }

    const data = query.data.split(' ') || [];

    switch (data[0]) {
      case 'package':
        selectPackage(bot, query.message, { mode: data[1] });
        break;
      case 'microBot':
        selectMicroBot(bot, query.message, { mode: data[1] });
        break;
      default:
        break;
    }
  });
};

export default packageRouter;
