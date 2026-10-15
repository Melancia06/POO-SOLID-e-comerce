
import { IProduct, ProductData } from './IProduct';
import { PhysicalProduct } from './PhysicalProduct';
import { DigitalProduct } from './DigitalProduct';

type ProductConstructor = (product: ProductData) => IProduct;

export class ProductFactory {
  private static types: Record<string, ProductConstructor> = {
    physical: (product) => new PhysicalProduct(product),
    digital: (product) => new DigitalProduct(product)
  };

  static registerType(
    type: string,
    constructor: ProductConstructor
  ): void {
    this.types[type] = constructor;
  }

  static create(product: ProductData): IProduct {
    const constructor = this.types[product.type];

    if (!constructor) {
      throw new Error(`Tipo de produto não suportado: ${product.type}`);
    }

    return constructor(product);
  }
}
