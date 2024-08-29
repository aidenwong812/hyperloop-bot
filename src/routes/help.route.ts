import type TelegramBot from 'node-telegram-bot-api';

const helpRouter = (bot: TelegramBot) => {
  bot.on('message', msg => {
    const { text } = msg;
    if (!text || text.startsWith('/')) {
      return;
    }

    if (text === '❕ Advertise') {
      bot.sendMessage(
        msg.chat.id,
        'Coming soon. Dm https://t.me/adhyperloop to secure advertisement slots',
      );
    }
  });
};

export default helpRouter;
