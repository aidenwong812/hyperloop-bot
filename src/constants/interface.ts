export interface Currency {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
}

export interface FixedRateMarket {
  from: string;
  to: string;
  min: number;
  max: number;
  rate: number;
  minerFee: number;
}

export interface ExchangeTransaction {
  id: string;
  payinAddress: string;
  payoutAddress: string;
  payoutExtraId: string;
  fromCurrency: string;
  toCurrency: string;
  refundAddress: string;
  refundExtraId: string;
  validUntil: string;
  amount: number;
  directedAmount: number;
}

export interface ExchangeData {
  estimatedAmount: number;
  networkFee: number;
  transactionSpeedForecast: string;
  warningMessage: string | null;
  rateId: string;
  validUntil: string;
}
