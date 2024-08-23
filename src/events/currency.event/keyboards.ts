import store from 'store';

export const StartKeyboard = () => [
  [{ text: 'Start new exchange', callback_data: 'Start new exchange' }],
  [{ text: '❕ Support Info', callback_data: 'ℹ️ Support Info' }],
];

export const StartExchangeKeyboard = (chatId: number) => {
  const settings = store.getSetting(chatId);
  const inputCurrency = settings?.inputCurrency?.name || '';

  if (inputCurrency === 'Ethereum') {
    return [
      [{ text: '✅ Ethereum (ETH)' }, { text: 'Ethereum (Base)' }],
      [{ text: 'Tron (TRX)' }, { text: 'Solana (SOL)' }],
      [
        {
          text: 'Ethereum (Binance Smart Chain)',
        },
        {
          text: 'Polygon (Matic)',
        },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Support Info' }],
    ];
  }

  if (inputCurrency === 'Ethereum (Base)') {
    return [
      [{ text: 'Ethereum (ETH)' }, { text: '✅ Ethereum (Base)' }],
      [{ text: 'Tron (TRX)' }, { text: 'Solana (SOL)' }],
      [
        {
          text: 'Ethereum (Binance Smart Chain)',
        },
        {
          text: 'Polygon (Matic)',
        },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Support Info' }],
    ];
  }

  if (inputCurrency === 'TRON') {
    return [
      [{ text: 'Ethereum (ETH)' }, { text: 'Ethereum (Base)' }],
      [{ text: '✅ Tron (TRX)' }, { text: 'Solana (SOL)' }],
      [
        {
          text: 'Ethereum (Binance Smart Chain)',
        },
        {
          text: 'Polygon (Matic)',
        },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Support Info' }],
    ];
  }

  if (inputCurrency === 'SOLANA') {
    return [
      [{ text: 'Ethereum (ETH)' }, { text: 'Ethereum (Base)' }],
      [{ text: 'Tron (TRX)' }, { text: '✅ Solana (SOL)' }],
      [
        {
          text: 'Ethereum (Binance Smart Chain)',
        },
        {
          text: 'Polygon (Matic)',
        },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Support Info' }],
    ];
  }

  if (inputCurrency === 'Ethereum (Binance Smart Chain)') {
    return [
      [{ text: 'Ethereum (ETH)' }, { text: 'Ethereum (Base)' }],
      [{ text: 'Tron (TRX)' }, { text: 'Solana (SOL)' }],
      [
        {
          text: '✅ Ethereum (Binance Smart Chain)',
        },
        {
          text: 'Polygon (Matic)',
        },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Support Info' }],
    ];
  }

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
    [{ text: '❌ Cancel exchange' }],
    [{ text: '❕ Support Info' }],
  ];
};
