import { Compra } from './Compra';
export class Transaccionp
{
  transactionId: string;
  date: Date;
  paymentMethodType: number;
  operationDate: Date;
  bankId: number;
  paymentMethod: number;
  attempts: number;
  transactionDate: Date;
  value: number;
  tax: string;
  pseBank: string;
  shippingCountry: string;
  description: string;
  currency: string;
  billingCountry: string;
  paymentMethodName: string;
  emailBuyer: string;
  paymentMethodId: number;
  responseMessagePol: string;
  referenceSale: Compra;
}
