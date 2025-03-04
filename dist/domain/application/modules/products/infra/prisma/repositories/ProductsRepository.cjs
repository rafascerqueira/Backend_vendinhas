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

// src/domain/application/modules/products/infra/prisma/repositories/ProductsRepository.ts
var ProductsRepository_exports = {};
__export(ProductsRepository_exports, {
  ProductsRepository: () => ProductsRepository
});
module.exports = __toCommonJS(ProductsRepository_exports);
var import_client = require("@prisma/client");
var import_inversify = require("inversify");
var ProductsRepository = class {
  repository;
  constructor() {
    this.repository = new import_client.PrismaClient();
  }
  async create(data) {
    const { name, description, price } = data;
    const value = Number.parseFloat(price).toFixed(2);
    const product = await this.repository.product.create({
      data: {
        name,
        description,
        price: {
          create: { value }
        }
      },
      include: { price: true }
    });
    return product;
  }
  async findById(id) {
    const product = await this.repository.product.findUnique({
      where: { id },
      include: {
        price: { select: { value: true }, where: { is_current: true } }
      }
    });
    return product;
  }
  async findByName(name) {
    const product = await this.repository.product.findFirst({
      where: { name },
      include: {
        price: { select: { value: true }, where: { is_current: true } }
      }
    });
    return product;
  }
  async getAll() {
    return await this.repository.product.findMany();
  }
  async update(id, data) {
    const { name, description, price } = data;
    if (price) {
      const value = Number.parseFloat(price).toFixed(2);
      const [_, updateProduct] = await this.repository.$transaction([
        this.repository.price.updateMany({
          where: { product_id: id },
          data: {
            is_current: false
          }
        }),
        this.repository.product.update({
          where: { id },
          data: {
            name,
            description,
            price: {
              create: {
                value
              }
            }
          }
        })
      ]);
      return updateProduct;
    } else {
      return await this.repository.product.update({
        where: { id },
        data: {
          name,
          description
        }
      });
    }
  }
  async delete(id) {
    const [_, deleteProduct] = await this.repository.$transaction([
      this.repository.price.deleteMany({ where: { product_id: id } }),
      this.repository.product.delete({ where: { id } })
    ]);
    return deleteProduct;
  }
};
ProductsRepository = __decorateClass([
  (0, import_inversify.injectable)()
], ProductsRepository);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductsRepository
});
