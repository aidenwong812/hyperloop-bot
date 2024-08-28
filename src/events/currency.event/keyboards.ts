import store from 'store';

export const StartKeyboard = () => [
  [{ text: 'Start new exchange' }],
  [{ text: 'Check Status' }],
  [{ text: '❕ Advertise' }],
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
      [{ text: 'Sui (Sui)' }],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
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
      [{ text: 'Sui (Sui)' }],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
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
      [{ text: 'Sui (Sui)' }],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
    ];
  }

  if (inputCurrency === 'Solana') {
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
      [{ text: 'Sui (Sui)' }],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
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
      [{ text: 'Sui (Sui)' }],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
    ];
  }

  if (inputCurrency === 'Polygon (Matic)') {
    return [
      [{ text: 'Ethereum (ETH)' }, { text: 'Ethereum (Base)' }],
      [{ text: 'Tron (TRX)' }, { text: 'Solana (SOL)' }],
      [
        {
          text: 'Ethereum (Binance Smart Chain)',
        },
        {
          text: '✅ Polygon (Matic)',
        },
      ],
      [{ text: 'Sui (Sui)' }],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
    ];
  }

  if (inputCurrency === 'Sui') {
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
      [{ text: '✅ Sui (Sui)' }],
      [{ text: '❌ Cancel exchange' }],
      [{ text: '❕ Advertise' }],
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
    [{ text: 'Sui (Sui)' }],
    [{ text: '❌ Cancel exchange' }],
    [{ text: '❕ Advertise' }],
  ];
};
