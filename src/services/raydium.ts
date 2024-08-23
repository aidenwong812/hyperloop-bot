import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Liquidity,
  jsonInfo2PoolKeys,
  Token,
  TokenAmount,
  Percent,
  LiquidityPoolKeys,
} from '@raydium-io/raydium-sdk';

import connection from 'configs/connection';

export const getPoolInfo = async ({
  baseMint,
  quoteMint,
}: {
  baseMint: string;
  quoteMint: string;
}) => {
  // fetch the liquidity pool list
  const liquidityJsonResp = await fetch(
    'https://api.raydium.io/v2/sdk/liquidity/mainnet.json',
  );

  if (!(await liquidityJsonResp).ok) return null;

  const liquidityJson = await liquidityJsonResp.json();

  const allPoolKeysJson = [
    ...(liquidityJson?.official ?? []),
    ...(liquidityJson?.unOfficial ?? []),
  ];

  // find the liquidity pair
  const poolKeysRaySolJson =
    allPoolKeysJson.filter(
      item => item.baseMint === baseMint && item.quoteMint === quoteMint,
    )?.[0] || null;

  // convert the json info to pool key using jsonInfo2PoolKeys
  const poolKeys = jsonInfo2PoolKeys(poolKeysRaySolJson);

  return poolKeys;
};

export const calcAmountOut = async ({
  poolKeys,
  rawAmountIn,
  swapInDirection = true,
}: {
  poolKeys: LiquidityPoolKeys;
  rawAmountIn: number;
  swapInDirection: boolean;
}) => {
  const poolInfo = await Liquidity.fetchInfo({ connection, poolKeys });
  let currencyInMint = poolKeys.baseMint;
  let currencyInDecimals = poolInfo.baseDecimals;
  let currencyOutMint = poolKeys.quoteMint;
  let currencyOutDecimals = poolInfo.quoteDecimals;

  if (!swapInDirection) {
    currencyInMint = poolKeys.quoteMint;
    currencyInDecimals = poolInfo.quoteDecimals;
    currencyOutMint = poolKeys.baseMint;
    currencyOutDecimals = poolInfo.baseDecimals;
  }

  const currencyIn = new Token(
    TOKEN_PROGRAM_ID,
    currencyInMint,
    currencyInDecimals,
  );
  const amountIn = new TokenAmount(currencyIn, rawAmountIn, false);
  const currencyOut = new Token(
    TOKEN_PROGRAM_ID,
    currencyOutMint,
    currencyOutDecimals,
  );
  const slippage = new Percent(5, 100);

  const {
    amountOut,
    minAmountOut,
    currentPrice,
    executionPrice,
    priceImpact,
    fee,
  } = Liquidity.computeAmountOut({
    poolKeys,
    poolInfo,
    amountIn,
    currencyOut,
    slippage,
  });

  return {
    amountIn,
    amountOut,
    minAmountOut,
    currentPrice,
    executionPrice,
    priceImpact,
    fee,
  };
};
