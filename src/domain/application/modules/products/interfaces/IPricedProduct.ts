import type { Price, Product } from "@prisma/client";

export interface IPricedProduct {
	product: Product;
	priced: Price;
}
