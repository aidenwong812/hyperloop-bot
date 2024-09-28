export const StartKeyboard = () => [
  [{ text: 'Start new exchange' }],
  [{ text: 'Check Status' }],
  [{ text: '❕ Advertise' }],
];

export const StartExchangeKeyboard = () => {
  return [
    [{ text: 'Bitcoin (BTC)' }, { text: 'Ethereum (ETH)' }],
    [
      { text: 'Ethereum (Base)' },
      {
        text: 'Ethereum (Binance Smart Chain)',
      },
    ],
    [{ text: 'Tron (TRX)' }, { text: 'Solana (SOL)' }],
    [
      {
        text: 'Polygon (Matic)',
      },
      { text: 'Sui (Sui)' },
    ],
    [{ text: '❌ Cancel exchange' }],
    [{ text: '❕ Advertise' }],
  ];
};
