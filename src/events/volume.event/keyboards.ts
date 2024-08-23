export const boostVolumeKeyboard = () => [
  [{ text: '🚀 Fast: 6H', callback_data: 'boostVolume fastMode' }],
  [{ text: '🚈 Normal: 24H', callback_data: 'boostVolume normalMode' }],
  [{ text: '🎮 Learn more', callback_data: 'learnMore' }],
];

export const boostVolumeModeKeyboard = () => [
  [{ text: '🔙 Return', callback_data: 'return' }],
];
