import TelegramBot from 'node-telegram-bot-api';
import { startExchange } from 'events/start.event';
import store from 'store';
import {
  handleConfirm,
  handleInputAmount,
  handleOutputAmount,
} from 'events/exchange.event';

const exchangeRouter = (bot: TelegramBot) => {
  bot.on('message', async msg => {
    const { text } = msg;
    if (!text || text.startsWith('/')) {
      return;
    }

    if (text === 'Start new exchange' || text === 'Start exchange') {
      await startExchange(bot, msg);

      store.setSetting(msg.chat.id, { start: true });
      return;
    }

    const settings = store.getSetting(msg.chat.id);
    if (settings && settings.recipientAddress && text === '✅ Confirm') {
      handleConfirm(bot, msg);
      return;
    }
    if (settings && settings.exchangeData?.estimatedAmount > 0) {
      handleOutputAmount(bot, msg, text);
      return;
    }
    if (settings && settings.outputCurrency) {
      handleInputAmount(bot, msg, parseFloat(text));
    }
  });
};

export default exchangeRouter;
