import { PublicKey } from '@solana/web3.js';
import TelegramBot from 'node-telegram-bot-api';
import connection from 'configs/connection';
import { MainPackages, MicroPackages, waitingTime } from 'constants/consts';
import { getBalance, verifyAddress } from 'services/solana';
import store from 'store';

export const waitForFunds = (bot: TelegramBot, chatId: number) => {
  const walletAddress = store.getWallet(chatId)?.publicKey;
  const settings = store.getSetting(chatId);
  let totalPrice = 0;
  let botStarted = false;

  totalPrice += MainPackages[settings?.mainPackage]?.price || 0;

  // eslint-disable-next-line array-callback-return
  settings?.microPackage?.map((one: string) => {
    totalPrice += MicroPackages[one]?.price || 0;
  });

  if (!verifyAddress(walletAddress)) {
    return;
  }

  const subscriptionId = connection.onLogs(
    new PublicKey(walletAddress),
    async logs => {
      if (!logs.err && logs.signature) {
        const signature = logs.signature.toString();

        const transaction = await connection.getTransaction(signature, {
          maxSupportedTransactionVersion: 0,
        });

        if (!transaction) return;

        const { meta } = transaction;

        if (!meta) return;
        if (meta.err) return;

        const balance = await getBalance(walletAddress);

        if (balance >= totalPrice) {
          bot.sendMessage(chatId, 'Funds are available!');
          connection.removeAccountChangeListener(subscriptionId);
          botStarted = true;
        }
      }
    },
    'finalized',
  );

  setTimeout(() => {
    if (!botStarted) {
      connection.removeAccountChangeListener(subscriptionId);
      bot.sendMessage(
        chatId,
        `Session Expired for your package bot for ${settings?.marketId}! Please start the bot again. Do not send SOL before starting the bot again.`,
      );
    }
  }, waitingTime);
};
