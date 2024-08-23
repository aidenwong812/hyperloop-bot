import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

import { commands } from 'constants/commands';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN || '';
const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(commands);

export default bot;
