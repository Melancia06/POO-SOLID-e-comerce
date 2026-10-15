
import { IProduct, ProductData } from './IProduct';

export class PhysicalProduct implements IProduct {
  constructor(private product: ProductData) {}

  calculateTotal(quantity: number): number {
    const subtotal = this.product.price * quantity;
    const shipping = 10;

    return subtotal + shipping;
  }
}
