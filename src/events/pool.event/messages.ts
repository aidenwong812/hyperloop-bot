import store from 'store';

export const getPoolLoadingMessage = () => {
  return `
    Please wait while we check for the pool on Raydium...
  `;
};

export const getInvalidPoolMessage = () => {
  return `
    Please create a pool between SOL and the token on Raydium first and then try again after pool is created
  `;
};

export const getPackageMessage = (chatId: number, marketId: string) => {
  const settings = store.getSetting(chatId);

  return `
    🌐 Cracked Bot uses allocated SOL to generate volume through over 1,444 wallets per Bot, ensuring each transaction is recognized as a new holder. The cost of the package is the only expense you will incur.
    Keeping the bot active for up to ${settings.operationMode === 'normal' ? '24' : '6'} hours,

    🚀 Choose the desired Volume Boosting package for: ${marketId}
  `;
};
