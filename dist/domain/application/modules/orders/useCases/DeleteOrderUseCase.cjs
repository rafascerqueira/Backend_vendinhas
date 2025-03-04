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

// src/domain/application/modules/orders/useCases/DeleteOrderUseCase.ts
var DeleteOrderUseCase_exports = {};
__export(DeleteOrderUseCase_exports, {
  DeleteOrderUseCase: () => DeleteOrderUseCase
});
module.exports = __toCommonJS(DeleteOrderUseCase_exports);

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

// src/domain/application/modules/orders/useCases/DeleteOrderUseCase.ts
var import_inversify = require("inversify");
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
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(types_default.OrdersRepository))
], DeleteOrderUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteOrderUseCase
});
