import prisma from 'configs/database';
import store from 'store';
import { createUser } from './user.controller';

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
    const { userId } = params;
    await createUser(Number(userId), '');

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
  let transaction = await prisma.transaction.findUnique({
    where: {
      transactionId,
    },
  });

  if (transaction) {
    transaction = await prisma.transaction.update({
      where: {
        transactionId,
      },
      data: params,
    });
  } else {
    transaction = await createTransaction({ transactionId, ...params });
  }

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
