export interface IFormatedOrder {
  id: number;
  amount: string;
  customer: string;
  products: Product[];
  created_at: Date;
  updated_at: Date;
}

type Product = {
  name: string;
  description: string;
  price: string;
  quantity: number;
};
