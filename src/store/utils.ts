import { findAllUsers } from 'controllers/user.controller';
import { findAllWallets } from 'controllers/wallet.controller';

const initStore = async (store: any) => {
  const users = await findAllUsers();
  const wallets = await findAllWallets();

  users.forEach((user: any) => {
    store.setUser(user);
    store.setReferrer(user);
  });
  wallets.forEach((wallet: any) => store.setWallet(wallet));

  store.setIntervalID({
    start: null,
    managePositions: null,
    token: null,
  });
};

export default initStore;
