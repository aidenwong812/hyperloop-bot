import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

import prisma from 'configs/database';
import store from 'store';

export const findAllWallets = async () => {
  const wallets = await prisma.wallet.findMany();
  return wallets;
};

export const createWallet = async (id: number) => {
  try {
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toBase58();
    const secretKey = bs58.encode(keypair.secretKey);
    const wallet = await prisma.wallet.create({
      data: {
        id,
        publicKey,
        secretKey,
      },
    });

    store.setWallet(wallet);

    return wallet;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const findWallet = (id: number) => {
  return store.getWallet(id);
};

export const updateWallet = async (id: number) => {
  const keypair = Keypair.generate();
  const publicKey = keypair.publicKey.toBase58();
  const secretKey = bs58.encode(keypair.secretKey);

  const wallet = await prisma.wallet.update({
    where: {
      id,
    },
    data: {
      publicKey,
      secretKey,
    },
  });

  store.setWallet(wallet);

  return wallet;
};
