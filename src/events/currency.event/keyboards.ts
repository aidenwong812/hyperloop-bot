import store from 'store';

export const StartKeyboard = () => [
  [{ text: 'Start new exchange' }],
  [{ text: 'Check Status' }],
  [{ text: '❕ Advertise' }],
];

export const StartExchangeKeyboard = (chatId: number) => {
  const settings = store.getSetting(chatId);
  const inputCurrency = settings?.inputCurrency?.name || '';

  if (inputCurrency === 'Bitcoin') {
    return [
      [{ text: '✅ Bitcoin (BTC)' }, { text: 'Ethereum (ETH)' }],
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
  }

  if (inputCurrency === 'Ethereum') {
    return [
      [{ text: 'Bitcoin (BTC)' }, { text: '✅ Ethereum (ETH)' }],
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
  }

  if (inputCurrency === 'Ethereum (Base)') {
    return [
      [{ text: 'Bitcoin (BTC)' }, { text: 'Ethereum (ETH)' }],
      [
        { text: '✅ Ethereum (Base)' },
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
  }

  if (inputCurrency === 'Ethereum (Binance Smart Chain)') {
    return [
      [{ text: 'Bitcoin (BTC)' }, { text: 'Ethereum (ETH)' }],
      [
        { text: 'Ethereum (Base)' },
        {
          text: '✅ Ethereum (Binance Smart Chain)',
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
  }

  if (inputCurrency === 'TRON') {
    return [
      [{ text: 'Bitcoin (BTC)' }, { text: 'Ethereum (ETH)' }],
      [
        { text: 'Ethereum (Base)' },
        {
          text: 'Ethereum (Binance Smart Chain)',
        },
      ],
      [{ text: '✅ Tron (TRX)' }, { text: 'Solana (SOL)' }],
      [
        {
          text: 'Polygon (Matic)',
        },
        { text: 'Sui (Sui)' },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
    ];
  }

  if (inputCurrency === 'Solana') {
    return [
      [{ text: 'Bitcoin (BTC)' }, { text: 'Ethereum (ETH)' }],
      [
        { text: 'Ethereum (Base)' },
        {
          text: 'Ethereum (Binance Smart Chain)',
        },
      ],
      [{ text: 'Tron (TRX)' }, { text: '✅ Solana (SOL)' }],
      [
        {
          text: 'Polygon (Matic)',
        },
        { text: 'Sui (Sui)' },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
    ];
  }

  if (inputCurrency === 'Polygon (Matic)') {
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
          text: '✅ Polygon (Matic)',
        },
        { text: 'Sui (Sui)' },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
    ];
  }

  if (inputCurrency === 'Sui') {
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
        { text: '✅ Sui (Sui)' },
      ],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
    ];
  }

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
