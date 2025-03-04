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

// src/domain/application/modules/customers/useCases/CreateCustomerUseCase.ts
var CreateCustomerUseCase_exports = {};
__export(CreateCustomerUseCase_exports, {
  CreateCustomerUseCase: () => CreateCustomerUseCase
});
module.exports = __toCommonJS(CreateCustomerUseCase_exports);

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

// src/domain/application/modules/customers/useCases/CreateCustomerUseCase.ts
var import_inversify = require("inversify");
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
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(types_default.CustomersRepository))
], CreateCustomerUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCustomerUseCase
});
