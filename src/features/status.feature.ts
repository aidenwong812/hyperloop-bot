import { getEstimatedFixedRateExchangeAmount } from 'services/change-now';

export const calculateAirdropPoint = async (
  inputCurrency: string,
  inputAmount: number,
): Promise<number> => {
  const estimatedAmountInBTC = await getEstimatedFixedRateExchangeAmount(
    inputCurrency,
    'btc',
    inputAmount,
  );

  if (estimatedAmountInBTC.estimatedAmount > 1) {
    return 250_000;
  }
  if (estimatedAmountInBTC.estimatedAmount > 0.5) {
    return 75_000;
  }
  if (estimatedAmountInBTC.estimatedAmount > 0.1) {
    return 25_000;
  }
  if (estimatedAmountInBTC.estimatedAmount > 0.01) {
    return 1500;
  }
  return 100;
};
