import { MainPackages, MicroPackages } from 'constants/consts';
import store from 'store';

export const selectPackageMessage = (mode: string) => {
  return `
    <b>Excellent!</b> The package <b>${MainPackages[mode].name ?? ''}</b> has been added to your cart.
    Would you like to add <b>MicroBots</b>? Adding all 6 will boost your plan with an extra 10-15 transactions per minute! 🚀
  `;
};

export const selectAdditionalPackageMessage = () => {
  return `
    Great! Would you like to add another additional <b>MicroBots</b>? Adding all 6 will boost your plan with an extra 10-15 transactions per minute! 🚀
  `;
};

export const acceptMicroBotMessage = () => {
  return `
    Choose up to six <b>MicroBots</b>, one from each package. 🤖 By using all six, you can attain a volume comparable to that of the <b>Starter Boost - 9 Sol</b> package. Each <b>MicroBot</b> operates independently, switching between <b>new wallets</b> and executing transactions of various sizes.
  `;
};

export const declineMicroBotMessage = (chatId: number) => {
  const wallet = store.getWallet(chatId);
  const settings = store.getSetting(chatId);
  let microPackages = '';
  let totalPrice = 0;

  totalPrice += MainPackages[settings?.mainPackage]?.price || 0;

  // eslint-disable-next-line array-callback-return
  settings?.microPackage?.map((one: string) => {
    microPackages += `- ${MicroPackages[one]?.name}\n`;
    totalPrice += MicroPackages[one]?.price || 0;
  });

  return `
    You're almost ready to kickstart your Volume Boost! Here's your order summary:

    - ${MainPackages[settings?.mainPackage]?.name}
    ${microPackages}
    To activate the bots, please send ${totalPrice} SOL to this address: <code>${wallet.publicKey}</code>
  `;
};
