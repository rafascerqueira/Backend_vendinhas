import { IFormatedOrder } from "@modules/orders/interfaces/IFormatedOrder";
import { Order } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

/**
 *
 * @param query - Database query return
 * @returns An object IFormatedOrder
 */
export const formatedOrder = (query: Order & Joins): IFormatedOrder => {
  return {
    id: query?.id,
    amount: query?.amount.toString(),
    customer: query?.customer.name,
    products: query?.products.map((prod) => {
      let value = "";
      prod.product.price.map((el) => (value = el.value.toString()));
      let format = {
        name: prod.product.name,
        description: prod.product.description,
        price: value,
        quantity: prod.quantity,
      };

      return format;
    }),
    created_at: query?.created_at,
    updated_at: query?.updated_at,
  };
};

type Joins = {
  customer: {
    name: string;
  };
  products: {
    product: {
      price: {
        value: Decimal;
      }[];
      name: string;
      description: string;
    };
    quantity: number;
  }[];
};
