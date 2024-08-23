export const selectPackageKeyboard = () => [
  [
    { text: 'Yes', callback_data: 'microBot accept' },
    { text: 'No', callback_data: 'microBot decline' },
  ],
];

export const acceptMicroBotKeyboard = () => [
  [{ text: 'MicroBot A 🟪 1 SOL', callback_data: 'microBot A' }],
  [{ text: 'MicroBot B 🟩 1.2 SOL', callback_data: 'microBot B' }],
  [{ text: 'MicroBot C 🟧 1.5 SOL', callback_data: 'microBot C' }],
  [{ text: 'MicroBot D 🟨 2 SOL', callback_data: 'microBot D' }],
  [{ text: 'MicroBot E 🟥 2.5 SOL', callback_data: 'microBot E' }],
  [{ text: 'MicroBot F 🟦 3 SOL', callback_data: 'microBot F' }],
  [{ text: 'Return', callback_data: 'microBot return' }],
];

export const declineMicroBotKeyboard = () => [
  [{ text: 'Cancel', callback_data: 'microBot cancel' }],
];
