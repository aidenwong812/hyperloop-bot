import { convertToShort, formatNumber, roundPrice } from 'utils';

export const WelcomeMessage = () => {
  return `
    Welcome to <b>Cracked Bot!</b>
    Experience the unique power of Solana Volume Boosting Service, designed to attract new organic investors.

    Here's How:
    🔄 Volume Generation: Continuous trading volume for 24 hours.
    📦 Package Selection: Various packages tailored to your needs.
    🚀 Multiple Transactions: Adding MicroBots, you get up to 50 tx per minute, each from a unique wallet showcasing new holders.
    🌐 FOMO Creation: Significant volume from new wallets effectively creates FOMO.
    🌟 Organic Trending: High transaction rates and volume naturally improve visibility on various crypto platforms.

    Get Started! Boost your market presence discreetly and effectively with Cracked Bot.
  `;
};

export const positionsMessage = ({
  tokenAccounts,
  walletBalance,
}: {
  tokenAccounts: any[];
  walletBalance: number;
}) => {
  let msg = '';

  msg += `
    📌 Positions Overview:
  `;

  tokenAccounts.forEach((tokenAccount, index) => {
    const {
      mint,
      symbol,
      balanceUsd,
      balanceSol,
      mcap,
      liquidity,
      pooledSol,
      priceUsd,
      priceChange,
      profitPercent,
      profitSol,
    } = tokenAccount;

    msg += `
      /${index + 1} <a href="https://birdeye.so/token/${mint}?chain=solana">${symbol}</a>
      💰 Worth: <b>${roundPrice(balanceSol)} SOL</b> / <b>$${roundPrice(balanceUsd)}</b>
      🚀 Profit: <b>${roundPrice(profitPercent)}%</b> / <b>${roundPrice(profitSol)} SOL</b>
      💥 5m: <b>${formatNumber(priceChange.m5)}%</b>, 1h: <b>${formatNumber(priceChange.h1)}%</b>, 6h: <b>${formatNumber(priceChange.h6)}%</b>, 24h: <b>${formatNumber(priceChange.h24)}%</b>
      💡 Market cap: <b>$${convertToShort(mcap)}</b> @ <b>$${roundPrice(priceUsd)}</b>
      💧 Liquidity: <b>$${convertToShort(liquidity)}</b>
      ⛽ Pooled SOL: <b>${pooledSol.toFixed(2)} SOL</b>
    `;
  });

  msg += `
    ⚖️ Balance: <b>${walletBalance} SOL</b>

    <i>Tip: Tap number next to token to sell and manage your position</i>
  `;

  return msg;
};
