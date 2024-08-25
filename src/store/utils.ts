import { findAllUsers } from 'controllers/user.controller';
import { findAllTransactions } from 'controllers/transaction.controller';

const initStore = async (store: any) => {
  const users = await findAllUsers();
  const transactions = await findAllTransactions();

  users.forEach((user: any) => {
    store.setUser(user);
    store.setReferrer(user);
  });
  transactions.forEach((transaction: any) => store.setWallet(transaction));
};

export default initStore;
