import {
  Currency,
  ExchangeData,
  ExchangeTransaction,
  FixedRateMarket,
} from 'constants/interface';

const V1_BASE_URL = 'https://api.changenow.io/v1';
const apiKey = process.env.ChangeNOW_API_KEY;

export const getAvailableCurrencies = async (): Promise<Currency[]> => {
  const options = {
    method: 'GET',
  };

  const res = await fetch(
    `${V1_BASE_URL}/currencies?active=true&fixedRate=true`,
    options,
  ).then(response => response.json());

  return res;
};

export const getAvailableFixedRateMarkets = async (): Promise<
  FixedRateMarket[]
> => {
  const options = {
    method: 'GET',
  };

  const res = await fetch(
    `${V1_BASE_URL}/market-info/fixed-rate/${apiKey}`,
    options,
  ).then(response => response.json());

  return res;
};

export const getMinimalExchangeAmount = async (
  inputCurrency: string,
  outputCurrency: string,
): Promise<number> => {
  const options = {
    method: 'GET',
  };

  const res = await fetch(
    `${V1_BASE_URL}/min-amount/${inputCurrency}_${outputCurrency}?api_key=${apiKey}`,
    options,
  ).then(response => response.json());

  return res?.minAmount || 0;
};

export const getEstimatedFixedRateExchangeAmount = async (
  inputCurrency: string,
  outputCurrency: string,
  inputAmount: number,
): Promise<ExchangeData> => {
  const options = {
    method: 'GET',
  };

  const res = await fetch(
    `${V1_BASE_URL}/exchange-amount/fixed-rate/${inputAmount}/${inputCurrency}_${outputCurrency}?api_key=${apiKey}&useRateId=true`,
    options,
  ).then(response => response.json());

  return res;
};

export const createExchangeTransaction = async (
  inputCurrency: string,
  outputCurrency: string,
  inputAmount: number,
  recipientAddress: string,
): Promise<ExchangeTransaction> => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      from: inputCurrency,
      to: outputCurrency,
      amount: inputAmount,
      address: recipientAddress,
    }),
  };

  const res = await fetch(
    `${V1_BASE_URL}/transactions/fixed-rate/${apiKey}`,
    options,
  ).then(response => response.json());

  return res;
};

export const getTransactionStatus = async (
  transactionId: string,
): Promise<string> => {
  const options = {
    method: 'GET',
  };

  const res = await fetch(
    `${V1_BASE_URL}/transactions/${transactionId}/${apiKey}`,
    options,
  ).then(response => response.json());

  return res.status;
};
