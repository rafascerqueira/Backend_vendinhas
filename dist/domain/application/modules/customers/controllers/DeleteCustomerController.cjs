"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/domain/application/modules/customers/controllers/DeleteCustomerController.ts
var DeleteCustomerController_exports = {};
__export(DeleteCustomerController_exports, {
  DeleteCustomerController: () => DeleteCustomerController
});
module.exports = __toCommonJS(DeleteCustomerController_exports);

// src/domain/application/shared/container/inversify.config.ts
var import_inversify5 = require("inversify");

// src/domain/application/modules/users/infra/prisma/repositories/UsersRepository.ts
var import_client = require("@prisma/client");
var import_inversify = require("inversify");
var import_bcrypt = __toESM(require("bcrypt"), 1);

// src/core/config/auth.ts
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var auth_default = {
  hashSaltRounds: 10,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY
  }
};

// src/domain/application/modules/users/infra/prisma/repositories/UsersRepository.ts
var UsersRepository = class {
  repository;
  constructor() {
    this.repository = new import_client.PrismaClient();
  }
  async create(data) {
    data.password = import_bcrypt.default.hashSync(data.password, auth_default.hashSaltRounds);
    await this.repository.user.create({ data });
  }
  async findByEmail(email) {
    return await this.repository.user.findUnique({
      where: {
        email
      }
    });
  }
  async findById(id) {
    return await this.repository.user.findUnique({ where: { id } });
  }
};
UsersRepository = __decorateClass([
  (0, import_inversify.injectable)()
], UsersRepository);

// src/domain/application/shared/container/types.ts
var TYPES = {
  UsersRepository: Symbol.for("UsersRepository"),
  CustomersRepository: Symbol.for("CustomersRepository"),
  ProductsRepository: Symbol.for("ProductsRepository"),
  OrdersRepository: Symbol.for("OrdersRepository"),
  BillingsRepository: Symbol.for("BillingsRepository")
};
var types_default = TYPES;

// src/domain/application/modules/customers/infra/prisma/repositories/CustomersRepository.ts
var import_client2 = require("@prisma/client");
var import_inversify2 = require("inversify");
var CustomersRepository = class {
  repository;
  constructor() {
    this.repository = new import_client2.PrismaClient();
  }
  async create(data) {
    return await this.repository.customer.create({ data });
  }
  async findByEmail(email) {
    return await this.repository.customer.findUnique({ where: { email } });
  }
  async findById(id) {
    return await this.repository.customer.findUnique({ where: { id } });
  }
  async update(id, payload) {
    return await this.repository.customer.update({
      where: { id },
      data: { ...payload }
    });
  }
  async delete(id) {
    return await this.repository.customer.delete({ where: { id } });
  }
};
CustomersRepository = __decorateClass([
  (0, import_inversify2.injectable)()
], CustomersRepository);

// src/domain/application/modules/products/infra/prisma/repositories/ProductsRepository.ts
var import_client3 = require("@prisma/client");
var import_inversify3 = require("inversify");
var ProductsRepository = class {
  repository;
  constructor() {
    this.repository = new import_client3.PrismaClient();
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
  (0, import_inversify3.injectable)()
], ProductsRepository);

// src/domain/application/modules/orders/infra/prisma/repositories/OrdersRepository.ts
var import_client4 = require("@prisma/client");

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
var import_inversify4 = require("inversify");
var OrdersRepository = class {
  repository;
  constructor() {
    this.repository = new import_client4.PrismaClient();
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
  (0, import_inversify4.injectable)()
], OrdersRepository);

// src/domain/application/shared/container/inversify.config.ts
var container = new import_inversify5.Container();
container.bind(types_default.UsersRepository).to(UsersRepository);
container.bind(types_default.CustomersRepository).to(CustomersRepository);
container.bind(types_default.ProductsRepository).to(ProductsRepository);
container.bind(types_default.OrdersRepository).to(OrdersRepository);
var inversify_config_default = container;

// src/domain/application/shared/errors/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/domain/application/modules/customers/useCases/DeleteCustomerUseCase.ts
var import_inversify6 = require("inversify");
var DeleteCustomerUseCase = class {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }
  async execute(id) {
    const customer = await this.customersRepository.findById(id);
    if (!customer) throw new AppError("invalid or non-existent customer");
    return await this.customersRepository.delete(id);
  }
};
DeleteCustomerUseCase = __decorateClass([
  (0, import_inversify6.injectable)(),
  __decorateParam(0, (0, import_inversify6.inject)(types_default.CustomersRepository))
], DeleteCustomerUseCase);

// src/domain/application/modules/customers/controllers/DeleteCustomerController.ts
var DeleteCustomerController = class {
  async handle(request, response) {
    const { id } = request.params;
    const customerRepo = inversify_config_default.resolve(DeleteCustomerUseCase);
    await customerRepo.execute(id);
    return response.send();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteCustomerController
});
