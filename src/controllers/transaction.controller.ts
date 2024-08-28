import prisma from 'configs/database';
import store from 'store';

export const findAllTransactions = async () => {
  const transactions = await prisma.transaction.findMany({
    where: {
      isValid: true,
    },
  });
  return transactions;
};

export const createTransaction = async (params: any) => {
  try {
    const transaction = await prisma.transaction.create({
      data: params,
    });

    store.setTransaction(transaction);

    return transaction;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return null;
  }
};

export const findTransaction = (transactionId: string) => {
  return store.getTransaction(transactionId);
};

export const updateTransaction = async (transactionId: string, params: any) => {
  const transaction = await prisma.transaction.update({
    where: {
      transactionId,
    },
    data: params,
  });

  store.setTransaction(transaction);

  return transaction;
};

export const deleteTransaction = async (transactionId: string) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      transactionId,
    },
  });

  if (transaction) {
    await prisma.transaction.delete({
      where: {
        transactionId,
      },
    });
  }
};
