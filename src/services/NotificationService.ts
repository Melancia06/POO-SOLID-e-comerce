
import { IMailProvider } from '../providers/IMailProvider';
import { OrderProduct } from '../repositories/IOrderRepository';

export class NotificationService {
  constructor(private mailProvider: IMailProvider) {}

  async sendOrderConfirmation(
    customer: string,
    orderId: number,
    total: number,
    products: OrderProduct[]
  ): Promise<string | false | undefined> {
    const productList = products
      .map((product) => `<li>${product.name} — quantidade: ${product.quantity}</li>`)
      .join('');

    return this.mailProvider.sendMail({
      to: customer,
      subject: `Confirmação do Pedido #${orderId}`,
      text: `Seu pedido #${orderId} foi confirmado. Total: R$ ${total.toFixed(2)}.`,
      html: `
        <h1>Pedido confirmado!</h1>
        <p>Pedido: <strong>#${orderId}</strong></p>
        <p>Total: <strong>R$ ${total.toFixed(2)}</strong></p>
        <ul>${productList}</ul>
      `
    });
  }
}
