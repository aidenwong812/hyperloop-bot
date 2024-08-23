import prisma from 'configs/database';
import store from 'store';
import { decrypt } from 'utils';

export const findAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const createUser = async (id: number, username: string, code = null) => {
  try {
    const referrerId = code && decrypt(code);

    const userController = await prisma.user.create({
      data: {
        id,
        username,
        referrerId,
      },
    });

    store.setUser(userController);
    store.setReferrer(userController);

    return userController;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const findUser = (id: number) => {
  return store.getUser(id);
};

export const findReferrer = (id: string) => {
  return store.getReferrer(id.toString());
};

export const getNumberOfReferrals = async (id: string) => {
  const count = await prisma.user.count({
    where: {
      referrerId: id.toString(),
    },
  });
  return count;
};
