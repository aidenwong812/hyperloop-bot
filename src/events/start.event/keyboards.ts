export const StartKeyboard = () => [
  [{ text: 'Start new exchange', callback_data: 'Start new exchange' }],
  [{ text: '❕ Support Info', callback_data: 'ℹ️ Support Info' }],
];

export const StartExchangeKeyboard = () => {
  return [
    [
      { text: 'Ethereum (ETH)', callback_data: 'Ethereum' },
      { text: 'Ethereum (Base)', callback_data: 'Ethereum (Base)' },
    ],
    [
      { text: 'Tron (TRX)', callback_data: 'Tron' },
      { text: 'Solana (SOL)', callback_data: 'Solana' },
    ],
    [
      {
        text: 'Ethereum (Binance Smart Chain)',
        callback_data: 'Ethereum (Binance Smart Chain)',
      },
    ],
    [{ text: '❌ Cancel exchange', callback_data: '❌ Cancel exchange' }],
    [{ text: '❕ Support Info', callback_data: 'ℹ️ Support Info' }],
  ];
};
