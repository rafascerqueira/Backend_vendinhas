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

// src/domain/application/modules/users/useCases/ShowUserUseCase.ts
var ShowUserUseCase_exports = {};
__export(ShowUserUseCase_exports, {
  ShowUserUseCase: () => ShowUserUseCase
});
module.exports = __toCommonJS(ShowUserUseCase_exports);

// src/domain/application/shared/container/types.ts
var TYPES = {
  UsersRepository: Symbol.for("UsersRepository"),
  CustomersRepository: Symbol.for("CustomersRepository"),
  ProductsRepository: Symbol.for("ProductsRepository"),
  OrdersRepository: Symbol.for("OrdersRepository"),
  BillingsRepository: Symbol.for("BillingsRepository")
};
var types_default = TYPES;

// src/domain/application/shared/services/excludeFields.ts
function exclude(entity, ...keys) {
  for (let key of keys) {
    delete entity[key];
  }
  return entity;
}

// src/domain/application/modules/users/useCases/ShowUserUseCase.ts
var import_inversify = require("inversify");
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
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(types_default.UsersRepository))
], ShowUserUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShowUserUseCase
});
