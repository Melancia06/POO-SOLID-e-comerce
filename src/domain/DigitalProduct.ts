
import { IProduct, ProductData } from './IProduct';

export class DigitalProduct implements IProduct {
  constructor(private product: ProductData) {}

  calculateTotal(quantity: number): number {
    return this.product.price * quantity;
  }
}
