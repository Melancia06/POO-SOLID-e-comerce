
import {
  IOrderRepository,
  OrderProduct
} from '../repositories/IOrderRepository';
import { NotificationService } from './NotificationService';
import { IPaymentMethod } from '../payments/IPaymentMethod';
import { ProductFactory } from '../domain/ProductFactory';
import { ProductData } from '../domain/IProduct';

export interface CreateOrderData {
  customer: string;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  paymentMethod: string;
  paymentDetails: unknown;
}

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private notificationService: NotificationService,
    private payments: Record<string, IPaymentMethod>
  ) {}

  async processOrder(data: CreateOrderData) {
    if (!data || typeof data !== 'object') {
      throw new Error('Dados do pedido inválidos');
    }

    const {
      customer,
      items,
      paymentMethod,
      paymentDetails
    } = data;

    if (typeof customer !== 'string' || !customer.trim()) {
      throw new Error('Cliente obrigatório');
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Carrinho vazio');
    }

    for (const item of items) {
      if (
        !item ||
        typeof item !== 'object' ||
        !Number.isInteger(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        throw new Error('Item ou quantidade inválida');
      }
    }

    const productsDetails: OrderProduct[] = [];
    let totalAmount = 0;

    for (const item of items) {
      const product =
        await this.orderRepository.findProductById(
          item.productId
        );

      if (!product) {
        throw new Error(
          `Produto ${item.productId} não encontrado`
        );
      }

      const productData: ProductData = {
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type
      };

      const productStrategy = ProductFactory.create(productData);

      totalAmount += productStrategy.calculateTotal(item.quantity);

      productsDetails.push({
        ...product,
        quantity: item.quantity
      });
    }

    const payment = this.payments[paymentMethod];

    if (!payment) {
      throw new Error('Método de pagamento não suportado');
    }

    await payment.process(paymentDetails);

    const order = await this.orderRepository.createOrder(
      customer,
      productsDetails,
      totalAmount
    );

    const emailPreview =
      await this.notificationService.sendOrderConfirmation(
        customer,
        order.id,
        totalAmount,
        productsDetails
      );

    return {
      message: 'Pedido processado com sucesso',
      orderId: order.id,
      totalAmount,
      customer,
      productsDetails,
      emailPreview
    };
  }
}
