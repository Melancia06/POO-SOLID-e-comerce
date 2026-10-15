
import { PrismaClient } from '@prisma/client';
import {
  IOrderRepository,
  ProductRecord,
  OrderProduct,
  SavedOrder
} from './IOrderRepository';

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  async findProductById(
    id: number
  ): Promise<ProductRecord | null> {
    const product = await this.prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      type: product.type
    };
  }

  async createOrder(
    customer: string,
    products: OrderProduct[],
    total: number
  ): Promise<SavedOrder> {
    const order = await this.prisma.order.create({
      data: {
        customer,
        items: JSON.stringify(products),
        total,
        status: 'confirmed'
      }
    });

    return { id: order.id };
  }
}
