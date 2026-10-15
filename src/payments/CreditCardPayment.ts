
import { IPaymentMethod } from './IPaymentMethod';
import logger from '../lib/logger';

export class CreditCardPayment implements IPaymentMethod {
  async process(paymentDetails: unknown): Promise<void> {
    if (
      !paymentDetails ||
      typeof paymentDetails !== 'object' ||
      !('cardNumber' in paymentDetails) ||
      typeof paymentDetails.cardNumber !== 'string' ||
      !paymentDetails.cardNumber ||
      !('cvv' in paymentDetails) ||
      typeof paymentDetails.cvv !== 'string' ||
      !paymentDetails.cvv
    ) {
      throw new Error('Dados do cartão incompletos');
    }

    logger.info(
      `Processando cartão final ${paymentDetails.cardNumber.slice(-4)}`
    );

    if (paymentDetails.cvv === '000') {
      throw new Error('Cartão recusado');
    }

  }
}
