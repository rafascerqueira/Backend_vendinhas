import { IProductListDTO } from "@modules/orders/dtos/IProductListDTO";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { Order, PrismaClient } from "@prisma/client";
import { calculatePurchaseAmount } from "@shared/services/calculatePurchaseAmount";
import { formatedOrder } from "@shared/services/formatedQueries";
import { injectable } from "inversify";

@injectable()
export class OrdersRepository implements IOrdersRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = new PrismaClient();
  }

  async create(
    customer_id: string,
    productList: IProductListDTO[]
  ): Promise<Order> {
    const order = await this.repository.order.create({
      data: { customer_id, products: { createMany: { data: productList } } },
    });

    const amount = await calculatePurchaseAmount({
      repository: this.repository,
      productList,
    });

    return await this.repository.order.update({
      where: { id: order.id },
      data: { amount },
    });
  }

  async getAll(): Promise<Order[]> {
    return await this.repository.order.findMany();
  }

  async getById(id: number): Promise<any | null> {
    const query = await this.repository.order.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        customer: {
          select: { name: true },
        },
        products: {
          select: {
            product: {
              select: {
                name: true,
                description: true,
                price: { select: { value: true }, where: { is_current: true } },
              },
            },
            quantity: true,
          },
        },
      },
    });

    const order = formatedOrder(query);

    return order;
  }

  async update(id: number, productList: IProductListDTO[]): Promise<Order> {
    await this.repository.order.update({
      where: { id },
      data: { products: { deleteMany: {} } },
    });

    const amount = await calculatePurchaseAmount({
      repository: this.repository,
      productList,
    });

    return await this.repository.order.update({
      where: { id },
      data: { amount, products: { createMany: { data: productList } } },
    });
  }

  async delete(id: number): Promise<Order> {
    return await this.repository.order.delete({ where: { id } });
  }
}
