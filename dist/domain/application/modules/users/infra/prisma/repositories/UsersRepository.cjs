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

// src/domain/application/modules/users/infra/prisma/repositories/UsersRepository.ts
var UsersRepository_exports = {};
__export(UsersRepository_exports, {
  UsersRepository: () => UsersRepository
});
module.exports = __toCommonJS(UsersRepository_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsersRepository
});
