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

// src/domain/application/modules/customers/infra/prisma/repositories/CustomersRepository.ts
var CustomersRepository_exports = {};
__export(CustomersRepository_exports, {
  CustomersRepository: () => CustomersRepository
});
module.exports = __toCommonJS(CustomersRepository_exports);
var import_client = require("@prisma/client");
var import_inversify = require("inversify");
var CustomersRepository = class {
  repository;
  constructor() {
    this.repository = new import_client.PrismaClient();
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
  (0, import_inversify.injectable)()
], CustomersRepository);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomersRepository
});
