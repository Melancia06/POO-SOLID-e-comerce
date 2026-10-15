
export interface IPaymentMethod {
  process(paymentDetails: unknown): Promise<void>;
}
