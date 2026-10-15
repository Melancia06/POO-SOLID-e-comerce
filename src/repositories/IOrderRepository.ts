
export interface ProductRecord {
  id: number;
  name: string;
  price: number;
  type: string;
}

export interface OrderProduct extends ProductRecord {
  quantity: number;
}

export interface SavedOrder {
  id: number;
}

export interface IOrderRepository {
  findProductById(id: number): Promise<ProductRecord | null>;

  createOrder(
    customer: string,
    products: OrderProduct[],
    total: number
  ): Promise<SavedOrder>;
}
