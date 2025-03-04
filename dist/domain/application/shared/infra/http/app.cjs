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

// src/domain/application/shared/infra/http/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_reflect_metadata = require("reflect-metadata");
var import_register = require("module-alias/register");
var import_express6 = __toESM(require("express"), 1);
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"), 1);

// src/domain/application/shared/infra/http/routes/index.ts
var import_express5 = require("express");

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

// src/domain/application/modules/customers/useCases/CreateCustomerUseCase.ts
var import_inversify6 = require("inversify");
var CreateCustomerUseCase = class {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }
  async execute({ name, email }) {
    const customerAlreadyExists = await this.customersRepository.findByEmail(email);
    if (customerAlreadyExists) throw new AppError("Customer already exists");
    const customer = await this.customersRepository.create({ name, email });
    return customer;
  }
};
CreateCustomerUseCase = __decorateClass([
  (0, import_inversify6.injectable)(),
  __decorateParam(0, (0, import_inversify6.inject)(types_default.CustomersRepository))
], CreateCustomerUseCase);

// src/domain/application/modules/customers/controllers/CreateCustomerController.ts
var CreateCustomerController = class {
  async handle(request, response) {
    const { name, email } = request.body;
    const createCustomer = inversify_config_default.resolve(CreateCustomerUseCase);
    await createCustomer.execute({ name, email });
    return response.status(201).send();
  }
};

// src/domain/application/modules/customers/useCases/DeleteCustomerUseCase.ts
var import_inversify8 = require("inversify");
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
  (0, import_inversify8.injectable)(),
  __decorateParam(0, (0, import_inversify8.inject)(types_default.CustomersRepository))
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

// src/domain/application/modules/customers/useCases/ShowCustomerUseCase.ts
var import_inversify10 = require("inversify");
var ShowCustomerUseCase = class {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }
  async execute(id) {
    const customer = await this.customersRepository.findById(id);
    if (!customer) throw new AppError("Customer was not found!");
    return customer;
  }
};
ShowCustomerUseCase = __decorateClass([
  (0, import_inversify10.injectable)(),
  __decorateParam(0, (0, import_inversify10.inject)(types_default.CustomersRepository))
], ShowCustomerUseCase);

// src/domain/application/modules/customers/controllers/ShowCustomerController.ts
var ShowCustomerController = class {
  async handle(request, response) {
    const { id } = request.params;
    const findCustomer = inversify_config_default.resolve(ShowCustomerUseCase);
    const customer = await findCustomer.execute(id);
    return response.json(customer);
  }
};

// src/domain/application/modules/customers/useCases/UpdateCustomerUseCase.ts
var import_inversify12 = require("inversify");
var UpdateCustomerUseCase = class {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }
  async execute(id, payload) {
    const customer = this.customersRepository.findById(id);
    if (!customer) throw new AppError("Customer was not found!");
    const updatedCustomer = this.customersRepository.update(id, payload);
    return updatedCustomer;
  }
};
UpdateCustomerUseCase = __decorateClass([
  (0, import_inversify12.injectable)(),
  __decorateParam(0, (0, import_inversify12.inject)(types_default.CustomersRepository))
], UpdateCustomerUseCase);

// src/domain/application/modules/customers/controllers/UpdateCustomerController.ts
var UpdateCustomerController = class {
  async handle(request, response) {
    const { id } = request.params;
    const payload = request.body;
    const updateCustomer = inversify_config_default.resolve(UpdateCustomerUseCase);
    const customer = updateCustomer.execute(id, payload);
    return response.json(customer);
  }
};

// src/domain/application/shared/infra/http/routes/customers.routes.ts
var import_express = require("express");
var customersRoutes = (0, import_express.Router)();
var createCustomerController = new CreateCustomerController();
var showCustomerController = new ShowCustomerController();
var updateCustomerController = new UpdateCustomerController();
var deleteCustomerController = new DeleteCustomerController();
customersRoutes.post("/", createCustomerController.handle);
customersRoutes.get("/:id", showCustomerController.handle);
customersRoutes.put("/:id", updateCustomerController.handle);
customersRoutes.delete("/:id", deleteCustomerController.handle);

// src/domain/application/modules/orders/useCases/CreateOrderUseCase.ts
var import_inversify14 = require("inversify");
var CreateOrderUseCase = class {
  constructor(ordersRepository, customersRepository) {
    this.ordersRepository = ordersRepository;
    this.customersRepository = customersRepository;
  }
  async execute(customer_id, productList) {
    const customerAlreadyExists = await this.customersRepository.findById(customer_id);
    if (!customerAlreadyExists) throw new AppError("Customer not found");
    const order = await this.ordersRepository.create(customer_id, productList);
    return order;
  }
};
CreateOrderUseCase = __decorateClass([
  (0, import_inversify14.injectable)(),
  __decorateParam(0, (0, import_inversify14.inject)(types_default.OrdersRepository)),
  __decorateParam(1, (0, import_inversify14.inject)(types_default.CustomersRepository))
], CreateOrderUseCase);

// src/domain/application/modules/orders/controllers/CreateOrderController.ts
var CreateOrderController = class {
  async handle(request, response) {
    const { customer_id, productList } = request.body;
    const createOrder = inversify_config_default.resolve(CreateOrderUseCase);
    const order = await createOrder.execute(customer_id, productList);
    return response.json(order);
  }
};

// src/domain/application/modules/orders/useCases/DeleteOrderUseCase.ts
var import_inversify16 = require("inversify");
var DeleteOrderUseCase = class {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(id) {
    const order = await this.orderRepository.getById(id);
    if (!order) throw new AppError("Invalid or non-existing order");
    return await this.orderRepository.delete(id);
  }
};
DeleteOrderUseCase = __decorateClass([
  (0, import_inversify16.injectable)(),
  __decorateParam(0, (0, import_inversify16.inject)(types_default.OrdersRepository))
], DeleteOrderUseCase);

// src/domain/application/modules/orders/controllers/DeleteOrderController.ts
var DeleteOrderController = class {
  async handle(request, response) {
    const { id } = request.params;
    const orderRepo = inversify_config_default.resolve(DeleteOrderUseCase);
    await orderRepo.execute(parseInt(id));
    return response.send();
  }
};

// src/domain/application/modules/orders/useCases/GetAllOrdersUseCase.ts
var import_inversify18 = require("inversify");
var GetAllOrdersUseCase = class {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }
  async execute() {
    return await this.ordersRepository.getAll();
  }
};
GetAllOrdersUseCase = __decorateClass([
  (0, import_inversify18.injectable)(),
  __decorateParam(0, (0, import_inversify18.inject)(types_default.OrdersRepository))
], GetAllOrdersUseCase);

// src/domain/application/modules/orders/controllers/GetAllOrdersController.ts
var GetAllOrdersController = class {
  async handle(_, response) {
    const getAllOrders = inversify_config_default.resolve(GetAllOrdersUseCase);
    const orders = await getAllOrders.execute();
    return response.json(orders);
  }
};

// src/domain/application/modules/orders/useCases/GetOneOrderUseCase.ts
var import_inversify20 = require("inversify");
var GetOneOrderUseCase = class {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }
  async execute(id) {
    return await this.ordersRepository.getById(id);
  }
};
GetOneOrderUseCase = __decorateClass([
  (0, import_inversify20.injectable)(),
  __decorateParam(0, (0, import_inversify20.inject)(types_default.OrdersRepository))
], GetOneOrderUseCase);

// src/domain/application/modules/orders/controllers/GetOneOrderController.ts
var GetOneOrderController = class {
  async handle(request, response) {
    const { id } = request.params;
    const getOneOrder = inversify_config_default.resolve(GetOneOrderUseCase);
    const order = await getOneOrder.execute(parseInt(id));
    return response.json(order);
  }
};

// src/domain/application/modules/orders/useCases/UpdateOrderUseCase.ts
var import_inversify22 = require("inversify");
var UpdateOrderUseCase = class {
  constructor(ordersRespository) {
    this.ordersRespository = ordersRespository;
  }
  async execute(id, productList) {
    const order = this.ordersRespository.getById(id);
    if (!order) throw new AppError("There is no Order to update");
    const updateOrder = this.ordersRespository.update(id, productList);
    return updateOrder;
  }
};
UpdateOrderUseCase = __decorateClass([
  (0, import_inversify22.injectable)(),
  __decorateParam(0, (0, import_inversify22.inject)(types_default.OrdersRepository))
], UpdateOrderUseCase);

// src/domain/application/modules/orders/controllers/UpdateOrderController.ts
var UpdateOrderController = class {
  async handle(request, response) {
    const { id } = request.params;
    const { productList } = request.body;
    const updateOrder = inversify_config_default.resolve(UpdateOrderUseCase);
    const order = updateOrder.execute(parseInt(id), productList);
    return response.json(order);
  }
};

// src/domain/application/shared/infra/http/routes/orders.routes.ts
var import_express2 = require("express");
var ordersRoutes = (0, import_express2.Router)();
var createOrderController = new CreateOrderController();
var getAllOrdersController = new GetAllOrdersController();
var getOneOrderController = new GetOneOrderController();
var updateOrderController = new UpdateOrderController();
var deleteOrderController = new DeleteOrderController();
ordersRoutes.post("/", createOrderController.handle);
ordersRoutes.get("/", getAllOrdersController.handle);
ordersRoutes.get("/:id", getOneOrderController.handle);
ordersRoutes.put("/:id", updateOrderController.handle);
ordersRoutes.delete("/:id", deleteOrderController.handle);

// src/domain/application/modules/products/useCases/CreateProductUseCase.ts
var import_inversify24 = require("inversify");
var CreateProductUseCase = class {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute({ name, description, price }) {
    const productAlreadyExists = await this.productsRepository.findByName(name);
    if (productAlreadyExists) throw new AppError("Customer already exists");
    const product = await this.productsRepository.create({
      name,
      description,
      price
    });
    return product;
  }
};
CreateProductUseCase = __decorateClass([
  (0, import_inversify24.injectable)(),
  __decorateParam(0, (0, import_inversify24.inject)(types_default.ProductsRepository))
], CreateProductUseCase);

// src/domain/application/modules/products/controllers/CreateProductController.ts
var CreateProductController = class {
  async handle(request, response) {
    const { name, description, price } = request.body;
    const createProduct = inversify_config_default.resolve(CreateProductUseCase);
    await createProduct.execute({ name, description, price });
    return response.status(201).send();
  }
};

// src/domain/application/modules/products/useCases/DeleteProductUseCase.ts
var import_inversify26 = require("inversify");
var DeleteProductUseCase = class {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute(id) {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new AppError("Invalid or non-existent product");
    return await this.productsRepository.delete(id);
  }
};
DeleteProductUseCase = __decorateClass([
  (0, import_inversify26.injectable)(),
  __decorateParam(0, (0, import_inversify26.inject)(types_default.ProductsRepository))
], DeleteProductUseCase);

// src/domain/application/modules/products/controllers/DeleteProductController.ts
var DeleteProductController = class {
  async handle(request, response) {
    const { id } = request.params;
    const deleteProduct = inversify_config_default.resolve(DeleteProductUseCase);
    await deleteProduct.execute(Number.parseInt(id));
    return response.send();
  }
};

// src/domain/application/modules/products/useCases/GetAllProductUseCase.ts
var import_inversify28 = require("inversify");
var GetAllProductUseCase = class {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute() {
    return await this.productsRepository.getAll();
  }
};
GetAllProductUseCase = __decorateClass([
  (0, import_inversify28.injectable)(),
  __decorateParam(0, (0, import_inversify28.inject)(types_default.ProductsRepository))
], GetAllProductUseCase);

// src/domain/application/modules/products/controllers/GetAllProductController.ts
var GetAllProductController = class {
  async handle(_, response) {
    const getAllProduct = inversify_config_default.resolve(GetAllProductUseCase);
    const products = await getAllProduct.execute();
    return response.json(products);
  }
};

// src/domain/application/modules/products/useCases/GetOneProductUseCase.ts
var import_inversify30 = require("inversify");
var GetOneProductUseCase = class {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute(id) {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new AppError("Product was not found!");
    return product;
  }
};
GetOneProductUseCase = __decorateClass([
  (0, import_inversify30.injectable)(),
  __decorateParam(0, (0, import_inversify30.inject)(types_default.ProductsRepository))
], GetOneProductUseCase);

// src/domain/application/modules/products/controllers/GetOneProductController.ts
var GetOneProductController = class {
  async handle(request, response) {
    const { id } = request.params;
    const findProduct = inversify_config_default.resolve(GetOneProductUseCase);
    const product = await findProduct.execute(Number.parseInt(id));
    return response.json(product);
  }
};

// src/domain/application/modules/products/useCases/UpdateProductUseCase.ts
var import_inversify32 = require("inversify");
var UpdateProductUseCase = class {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute(id, payload) {
    const product = this.productsRepository.findById(id);
    if (!product) throw new AppError("There is no Product to update");
    const updateProduct = this.productsRepository.update(id, payload);
    return updateProduct;
  }
};
UpdateProductUseCase = __decorateClass([
  (0, import_inversify32.injectable)(),
  __decorateParam(0, (0, import_inversify32.inject)(types_default.ProductsRepository))
], UpdateProductUseCase);

// src/domain/application/modules/products/controllers/UpdateProductController.ts
var UpdateProductController = class {
  async handle(request, response) {
    const { id } = request.params;
    const payload = request.body;
    const updateProduct = inversify_config_default.resolve(UpdateProductUseCase);
    const product = updateProduct.execute(Number.parseInt(id), payload);
    return response.json(product);
  }
};

// src/domain/application/shared/infra/http/routes/products.routes.ts
var import_express3 = require("express");
var productsRoutes = (0, import_express3.Router)();
var createProductController = new CreateProductController();
var getAllProductController = new GetAllProductController();
var getOneProductController = new GetOneProductController();
var updateProductController = new UpdateProductController();
var deleteProductController = new DeleteProductController();
productsRoutes.post("/", createProductController.handle);
productsRoutes.get("/", getAllProductController.handle);
productsRoutes.get("/:id", getOneProductController.handle);
productsRoutes.put("/:id", updateProductController.handle);
productsRoutes.delete("/:id", deleteProductController.handle);

// src/domain/application/shared/infra/http/routes/users.routes.ts
var import_express4 = require("express");

// src/domain/application/modules/users/useCases/CreateUserUseCase.ts
var import_inversify34 = require("inversify");
var CreateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ email, name, password }) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) throw new AppError("User already exists!");
    const user = await this.usersRepository.create({ name, email, password });
    return user;
  }
};
CreateUserUseCase = __decorateClass([
  (0, import_inversify34.injectable)(),
  __decorateParam(0, (0, import_inversify34.inject)(types_default.UsersRepository))
], CreateUserUseCase);

// src/domain/application/modules/users/controllers/CreateUserController.ts
var CreateUserController = class {
  async handle(request, response) {
    const { name, email, password } = request.body;
    const createUser = inversify_config_default.resolve(CreateUserUseCase);
    await createUser.execute({ name, email, password });
    return response.status(201).send();
  }
};

// src/domain/application/shared/services/refreshToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var createRefreshTokenData = (token, user) => {
  const { id } = user;
  const payload = {
    user_id: id,
    token
  };
  const refreshToken = import_jsonwebtoken.default.sign(payload, auth_default.jwt.privateKey, {
    algorithm: "RS256",
    expiresIn: "7d"
  });
  return refreshToken;
};

// src/domain/application/shared/services/token.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);
var sign = (user) => {
  const payload = { id: user.id, role: user.role };
  return import_jsonwebtoken2.default.sign(payload, auth_default.jwt.privateKey, {
    algorithm: "RS256",
    expiresIn: "15m"
  });
};

// src/domain/application/modules/users/useCases/AuthenticateUserUseCase.ts
var import_bcrypt2 = require("bcrypt");
var import_inversify36 = require("inversify");
var AuthenticateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("Username or password incorrect");
    const passwordMatch = await (0, import_bcrypt2.compare)(password, user.password);
    if (!passwordMatch) throw new AppError("Username or password incorrect");
    const token = sign(user);
    const refresh_token = createRefreshTokenData(token, user);
    const tokenReturn = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    };
    return tokenReturn;
  }
};
AuthenticateUserUseCase = __decorateClass([
  (0, import_inversify36.injectable)(),
  __decorateParam(0, (0, import_inversify36.inject)(types_default.UsersRepository))
], AuthenticateUserUseCase);

// src/domain/application/modules/users/controllers/AuthenticateUserController.ts
var AuthenticateUserController = class {
  async handle(request, response) {
    const { email, password } = request.body;
    const user = inversify_config_default.resolve(AuthenticateUserUseCase);
    const authentication = await user.execute({ email, password });
    return response.json(authentication);
  }
};

// src/domain/application/shared/services/excludeFields.ts
function exclude(entity, ...keys) {
  for (let key of keys) {
    delete entity[key];
  }
  return entity;
}

// src/domain/application/modules/users/useCases/ShowUserUseCase.ts
var import_inversify38 = require("inversify");
var ShowUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute(id) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      return { message: "Uncaught user" };
    }
    const treatedUser = exclude(user, "password");
    return treatedUser;
  }
};
ShowUserUseCase = __decorateClass([
  (0, import_inversify38.injectable)(),
  __decorateParam(0, (0, import_inversify38.inject)(types_default.UsersRepository))
], ShowUserUseCase);

// src/domain/application/modules/users/controllers/ShowUserController.ts
var ShowUserController = class {
  async handle(request, response) {
    const { id } = request.params;
    const findUser = inversify_config_default.resolve(ShowUserUseCase);
    const user = await findUser.execute(id);
    return response.json(user);
  }
};

// src/domain/application/shared/infra/http/routes/users.routes.ts
var usersRoutes = (0, import_express4.Router)();
var createUserController = new CreateUserController();
var authenticateUserController = new AuthenticateUserController();
var showUserController = new ShowUserController();
usersRoutes.get(
  "/",
  (_, response) => response.json({ message: "users routes" })
);
usersRoutes.post("/signup", createUserController.handle);
usersRoutes.post("/signin", authenticateUserController.handle);
usersRoutes.get("/:id", showUserController.handle);

// src/domain/application/shared/infra/http/routes/index.ts
var routes = (0, import_express5.Router)();
routes.get("/", (_, response) => {
  return response.json({ message: "Hello!" });
});
routes.use("/users", usersRoutes);
routes.use("/customers", customersRoutes);
routes.use("/products", productsRoutes);
routes.use("/orders", ordersRoutes);

// src/domain/application/shared/errors/index.ts
function handleErrors(error, request, response, next) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  return response.status(500).json({
    status: "Error",
    message: `Internal Server Error - ${error.message}`
  });
}

// src/core/config/corsOption.ts
var import_dotenv2 = require("dotenv");
(0, import_dotenv2.config)();
var corsOption_default = {
  origin: process.env.BASEURL,
  optionsSuccessStatus: 200
};

// src/domain/application/shared/infra/http/app.ts
var app = (0, import_express6.default)();
app.use(import_express6.default.json());
app.use((0, import_cors.default)(corsOption_default));
app.use(routes);
app.use(handleErrors);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
