import prisma from 'configs/database';

export const findSettings = async (id: number) => {
  const settings = await prisma.settings.findUnique({
    where: {
      id,
    },
  });
  return { settings };
};

export const createSettings = async (id: number) => {
  try {
    const setting = await prisma.settings.create({
      data: {
        id,
      },
    });
    return setting;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

export const updateSettings = async (id: number, params: any) => {
  if (params.autoSell !== undefined) {
    params.autoSell = !!params.autoSell;
  }

  if (params.autoBuy !== undefined) {
    params.autoBuy = !!params.autoBuy;
  }

  await prisma.settings.update({
    where: {
      id,
    },
    data: params,
  });

  const settings = await findSettings(id);

  return settings;
};
