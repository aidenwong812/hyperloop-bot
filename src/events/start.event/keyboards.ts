export const StartKeyboard = () => [
  [{ text: 'Start new exchange', callback_data: 'Start new exchange' }],
  [{ text: '❕ Advertise' }],
];

export const StartExchangeKeyboard = () => {
  return [
    [{ text: 'Ethereum (ETH)' }, { text: 'Ethereum (Base)' }],
    [{ text: 'Tron (TRX)' }, { text: 'Solana (SOL)' }],
    [
      {
        text: 'Ethereum (Binance Smart Chain)',
      },
      {
        text: 'Polygon (Matic)',
      },
    ],
    [{ text: 'Sui (Sui)' }],
    [{ text: '❌ Cancel exchange', callback_data: '❌ Cancel exchange' }],
    [{ text: '❕ Advertise' }],
  ];
};
