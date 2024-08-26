import { Currency } from 'constants/interface';
import { getAvailableCurrencies } from 'services/change-now';

export const selectCurrency = async (name: string, symbol = '') => {
  const availableCurrencies = await getAvailableCurrencies();

  if (name) {
    return availableCurrencies.filter(
      (currency: Currency) =>
        currency.name.toLowerCase() === name.toLowerCase(),
    );
  }

  if (symbol) {
    return availableCurrencies.filter((currency: Currency) =>
      currency.ticker.toLowerCase().startsWith(symbol.toLowerCase()),
    );
  }

  return [];
};
