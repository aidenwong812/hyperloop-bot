import TelegramBot from 'node-telegram-bot-api';
import store from 'store';
import {
  selectInputCurrency,
  selectOutputCurrency,
} from 'events/currency.event';

const currencyRouter = (bot: TelegramBot) => {
  bot.on('message', msg => {
    const { text } = msg;
    if (!text) {
      return;
    }

    if (text.startsWith('/')) {
      return;
    }

    const settings = store.getSetting(msg.chat.id);

    if (settings && settings.start && !settings.outputCurrency) {
      if (settings.inputCurrency) {
        selectOutputCurrency(bot, msg, text);
      } else if (!settings.outputCurrency) {
        selectInputCurrency(bot, msg, text);
      }
    }
  });
};

export default currencyRouter;
