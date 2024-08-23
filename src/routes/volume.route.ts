import TelegramBot from 'node-telegram-bot-api';
import { boostVolume, boostVolumeMode } from 'events/volume.event';
import store from 'store';
import { verifyAddress } from 'services/solana';
import { getPool } from 'events/pool.event';

const volumeRouter = (bot: TelegramBot) => {
  bot.on('callback_query', query => {
    const data = query.data?.split(' ') || [];

    if (data[0] === 'boostVolume') {
      switch (data[1]) {
        case 'fastMode':
          boostVolumeMode(bot, query.message?.chat?.id || 0, { mode: 'fast' });
          break;
        case 'normalMode':
          boostVolumeMode(bot, query.message?.chat?.id || 0, {
            mode: 'normal',
          });
          break;
        default:
          boostVolume(bot, query.message?.chat?.id || 0);
          break;
      }
    }
  });

  bot.on('message', msg => {
    if (msg.text?.startsWith('/')) {
      return;
    }

    const prompt = store.getSetting(msg.chat.id);

    if (prompt.operationMode && msg.text) {
      const isAddressValidated = verifyAddress(msg.text);

      if (!isAddressValidated) {
        bot.sendMessage(msg.chat.id, 'Please provide a valid address');
      } else {
        getPool(bot, msg.chat.id, msg.text);
      }

      return;
    }

    bot.sendMessage(
      msg.chat.id,
      'There are no such actions available. Please try again.',
    );
  });
};

export default volumeRouter;
