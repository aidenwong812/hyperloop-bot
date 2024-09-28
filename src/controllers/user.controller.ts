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

    let userController = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userController) {
      userController = await prisma.user.create({
        data: {
          id,
          username,
          referrerId,
        },
      });
    }

    store.setUser(userController);
    store.setReferrer(userController);

    return userController;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    return null;
  }
};

export const findUser = (id: number) => {
  return store.getUser(id);
};

export const updateUser = async (id: number, data: any) => {
  const userController = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  store.setUser(userController);
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
