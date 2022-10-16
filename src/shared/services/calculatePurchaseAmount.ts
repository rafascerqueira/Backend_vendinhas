import { IProductListDTO } from "@modules/orders/dtos/IProductListDTO";
import { Price, Prisma, PrismaClient } from "@prisma/client";

export const calculatePurchaseAmount = async ({
  repository,
  productList,
}: {
  repository: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  productList: IProductListDTO[];
}): Promise<number> => {
  const purchase: Price[][] = [];
  let quantity: number[] = [];
  let amount: number = 0;

  for (const product of productList) {
    const item: Price[] = await repository.price.findMany({
      where: { product_id: product.product_id, is_current: true },
    });

    quantity.push(product.quantity);
    purchase.push(item);
  }
  const flatList = purchase.reduce((prev, curr) => prev.concat(curr));
  flatList.map((price, indx) => {
    const value = price.value.toNumber();

    amount += value * quantity[indx];
  });

  return amount;
};
