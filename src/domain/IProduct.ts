
export interface ProductData {
  id: number;
  name: string;
  price: number;
  type: string;
}

export interface IProduct {
  calculateTotal(quantity: number): number;
}
