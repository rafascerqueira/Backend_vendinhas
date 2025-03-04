"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/domain/application/modules/orders/infra/prisma/repositories/OrdersRepository.ts
var OrdersRepository_exports = {};
__export(OrdersRepository_exports, {
  OrdersRepository: () => OrdersRepository
});
module.exports = __toCommonJS(OrdersRepository_exports);
var import_client = require("@prisma/client");

// src/domain/application/shared/services/calculatePurchaseAmount.ts
var calculatePurchaseAmount = async ({
  repository,
  productList
}) => {
  const purchase = [];
  let quantity = [];
  let amount = 0;
  for (const product of productList) {
    const item = await repository.price.findMany({
      where: { product_id: product.product_id, is_current: true }
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

// src/domain/application/shared/services/formatedQueries.ts
var formatedOrder = (query) => {
  return {
    id: query?.id,
    amount: query?.amount.toString(),
    customer: query?.customer.name,
    products: query?.products.map((prod) => {
      let value = "";
      prod.product.price.map((el) => value = el.value.toString());
      let format = {
        name: prod.product.name,
        description: prod.product.description,
        price: value,
        quantity: prod.quantity
      };
      return format;
    }),
    created_at: query?.created_at,
    updated_at: query?.updated_at
  };
};

// src/domain/application/modules/orders/infra/prisma/repositories/OrdersRepository.ts
var import_inversify = require("inversify");
var OrdersRepository = class {
  repository;
  constructor() {
    this.repository = new import_client.PrismaClient();
  }
  async create(customer_id, productList) {
    const order = await this.repository.order.create({
      data: { customer_id, products: { createMany: { data: productList } } }
    });
    const amount = await calculatePurchaseAmount({
      repository: this.repository,
      productList
    });
    return await this.repository.order.update({
      where: { id: order.id },
      data: { amount }
    });
  }
  async getAll() {
    return await this.repository.order.findMany();
  }
  async getById(id) {
    const query = await this.repository.order.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        customer: {
          select: { name: true }
        },
        products: {
          select: {
            product: {
              select: {
                name: true,
                description: true,
                price: { select: { value: true }, where: { is_current: true } }
              }
            },
            quantity: true
          }
        }
      }
    });
    const order = formatedOrder(query);
    return order;
  }
  async update(id, productList) {
    await this.repository.order.update({
      where: { id },
      data: { products: { deleteMany: {} } }
    });
    const amount = await calculatePurchaseAmount({
      repository: this.repository,
      productList
    });
    return await this.repository.order.update({
      where: { id },
      data: { amount, products: { createMany: { data: productList } } }
    });
  }
  async delete(id) {
    return await this.repository.order.delete({ where: { id } });
  }
};
OrdersRepository = __decorateClass([
  (0, import_inversify.injectable)()
], OrdersRepository);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OrdersRepository
});
