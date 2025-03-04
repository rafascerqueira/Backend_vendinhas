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
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/domain/application/modules/orders/useCases/CreateOrderUseCase.ts
var CreateOrderUseCase_exports = {};
__export(CreateOrderUseCase_exports, {
  CreateOrderUseCase: () => CreateOrderUseCase
});
module.exports = __toCommonJS(CreateOrderUseCase_exports);

// src/domain/application/shared/container/types.ts
var TYPES = {
  UsersRepository: Symbol.for("UsersRepository"),
  CustomersRepository: Symbol.for("CustomersRepository"),
  ProductsRepository: Symbol.for("ProductsRepository"),
  OrdersRepository: Symbol.for("OrdersRepository"),
  BillingsRepository: Symbol.for("BillingsRepository")
};
var types_default = TYPES;

// src/domain/application/shared/errors/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/domain/application/modules/orders/useCases/CreateOrderUseCase.ts
var import_inversify = require("inversify");
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
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(types_default.OrdersRepository)),
  __decorateParam(1, (0, import_inversify.inject)(types_default.CustomersRepository))
], CreateOrderUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateOrderUseCase
});
