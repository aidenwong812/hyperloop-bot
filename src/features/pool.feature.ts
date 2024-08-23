import { Market } from '@openbook-dex/openbook';
import * as spl from '@solana/spl-token';
import { AccountInfo, PublicKey } from '@solana/web3.js';

import connection from 'configs/connection';
import { OpenbookProgram, RayLiqPoolv4 } from 'constants/consts';
import * as structs from 'constants/structs';
import { findWallet } from 'controllers/wallet.controller';

const getMarketInfo = async (marketId: PublicKey) => {
  let requestsTry = 0;
  let marketInfo = null;

  while (!marketInfo) {
    try {
      // eslint-disable-next-line no-await-in-loop
      marketInfo = await connection.getAccountInfo(marketId);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Error getting account info');
    }

    requestsTry += 1;

    if (marketInfo) {
      break;
    } else if (requestsTry > 20) {
      // eslint-disable-next-line no-console
      console.error(`Could not get market info..`);

      return null;
    }
  }

  return marketInfo;
};

export const getDecodedData = async (marketInfo: {
  executable?: boolean;
  owner?: PublicKey;
  lamports?: number;
  data: any;
  rentEpoch?: number | undefined;
}) => {
  return Market.getLayout(OpenbookProgram).decode(marketInfo.data);
};

export const getMintData = async (mint: PublicKey) => {
  return connection.getAccountInfo(mint);
};

const getDecimals = (mintData: AccountInfo<Buffer> | null) => {
  if (!mintData) throw new Error('No mint data!');

  return structs.SPL_MINT_LAYOUT.decode(mintData.data).decimals;
};

const getOwnerAta = (
  mint: { toBuffer: () => Uint8Array | Buffer },
  publicKey: PublicKey,
) => {
  const foundAta = PublicKey.findProgramAddressSync(
    [publicKey.toBuffer(), spl.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    spl.ASSOCIATED_TOKEN_PROGRAM_ID,
  )[0];

  return foundAta;
};

const getVaultSigner = (
  marketId: { toBuffer: any },
  marketDeco: { vaultSignerNonce: { toString: () => any } },
) => {
  const seeds = [marketId.toBuffer()];
  const seedsWithNonce = seeds.concat(
    Buffer.from([Number(marketDeco.vaultSignerNonce.toString())]),
    Buffer.alloc(7),
  );

  return PublicKey.createProgramAddressSync(seedsWithNonce, OpenbookProgram);
};

export const validateMarketId = async (marketId: PublicKey) => {
  const marketInfo = await getMarketInfo(marketId);
  if (!marketInfo) return false;

  const marketDeco = await getDecodedData(marketInfo);
  const { baseMint, quoteMint } = marketDeco;
  const baseMintData = await getMintData(baseMint);
  const quoteMintData = await getMintData(quoteMint);
  if (!baseMintData || !quoteMintData) return false;

  return true;
};

export const derivePoolKeys = async (marketId: PublicKey, chatId: number) => {
  const marketInfo = await getMarketInfo(marketId);
  if (!marketInfo) return null;
  const marketDeco = await getDecodedData(marketInfo);
  const { baseMint } = marketDeco;
  const baseMintData = await getMintData(baseMint);
  const baseDecimals = await getDecimals(baseMintData);
  const ownerBaseAta = await getOwnerAta(baseMint, findWallet(chatId));
  const { quoteMint } = marketDeco;
  const quoteMintData = await getMintData(quoteMint);
  const quoteDecimals = await getDecimals(quoteMintData);
  const ownerQuoteAta = await getOwnerAta(quoteMint, findWallet(chatId));
  const authority = PublicKey.findProgramAddressSync(
    [
      Buffer.from([
        97, 109, 109, 32, 97, 117, 116, 104, 111, 114, 105, 116, 121,
      ]),
    ],
    RayLiqPoolv4,
  )[0];

  const marketAuthority = getVaultSigner(marketId, marketDeco);

  // get/derive all the pool keys
  const poolKeys = {
    keg: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    version: 4,
    marketVersion: 3,
    programId: RayLiqPoolv4,
    baseMint,
    quoteMint,
    ownerBaseAta,
    ownerQuoteAta,
    baseDecimals,
    quoteDecimals,
    lpDecimals: baseDecimals,
    authority,
    marketAuthority,
    marketProgramId: OpenbookProgram,
    marketId,
    marketBids: marketDeco.bids,
    marketAsks: marketDeco.asks,
    marketQuoteVault: marketDeco.quoteVault,
    marketBaseVault: marketDeco.baseVault,
    marketEventQueue: marketDeco.eventQueue,
    id: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('amm_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    baseVault: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('coin_vault_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    coinVault: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('pc_vault_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    lpMint: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('lp_mint_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    lpVault: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('temp_lp_token_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    targetOrders: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('target_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    withdrawQueue: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('withdraw_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    openOrders: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('open_order_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    quoteVault: PublicKey.findProgramAddressSync(
      [
        RayLiqPoolv4.toBuffer(),
        marketId.toBuffer(),
        Buffer.from('pc_vault_associated_seed', 'utf-8'),
      ],
      RayLiqPoolv4,
    )[0],
    lookupTableAccount: new PublicKey('11111111111111111111111111111111'),
  };

  return poolKeys;
};
