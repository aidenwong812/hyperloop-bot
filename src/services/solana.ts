import bs58 from 'bs58';
import { Wallet } from '@coral-xyz/anchor';
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

import connection from 'configs/connection';

export const getWallet = (secretKey: string) => {
  return new Wallet(Keypair.fromSecretKey(bs58.decode(secretKey)));
};

export const getBalance = async (walletAddress: string) => {
  const publicKey = new PublicKey(walletAddress);
  const res = await connection.getBalance(publicKey);
  return (1.0 * res) / LAMPORTS_PER_SOL;
};

export const getParsedAccountInfo = async (address: string) => {
  const publicKey = new PublicKey(address);
  const res = await connection.getParsedAccountInfo(publicKey, {});
  return res;
};

export const getTokenSupply = async (mint: string) => {
  const res = await connection.getTokenSupply(new PublicKey(mint));
  return res.value;
};

export const getTokenAccountsByOwner = async (owner: string) => {
  const res = await connection.getTokenAccountsByOwner(new PublicKey(owner), {
    programId: new PublicKey(TOKEN_PROGRAM_ID),
  });
  return res.value;
};

export const getConfirmation = async (txid: string) => {
  const result = await connection.getSignatureStatus(txid, {
    searchTransactionHistory: true,
  });
  return result.value?.confirmationStatus;
};

export const getATASync = async (mint: string, owner: string) => {
  const ata = getAssociatedTokenAddressSync(
    new PublicKey(mint),
    new PublicKey(owner),
  );
  return ata.toBase58();
};

export const confirmTransaction = async (txid: string) => {
  const res = await connection.confirmTransaction(txid);
  if (res.value.err) {
    throw new Error(res.value.err.toString());
  }
  return res;
};

export const verifyAddress = (address: string) => {
  if (address.length < 32 || address.length > 44) {
    return false;
  }

  // Use the web3.js library to perform checksum validation
  try {
    const publicKey = new PublicKey(address);
    return PublicKey.isOnCurve(publicKey);
  } catch {
    return false;
  }
};
