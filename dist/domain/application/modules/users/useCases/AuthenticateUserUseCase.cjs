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

// src/domain/application/modules/users/useCases/AuthenticateUserUseCase.ts
var AuthenticateUserUseCase_exports = {};
__export(AuthenticateUserUseCase_exports, {
  AuthenticateUserUseCase: () => AuthenticateUserUseCase
});
module.exports = __toCommonJS(AuthenticateUserUseCase_exports);

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

// src/domain/application/shared/services/refreshToken.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

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

// src/domain/application/shared/services/refreshToken.ts
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
var import_bcrypt = require("bcrypt");
var import_inversify = require("inversify");
var AuthenticateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("Username or password incorrect");
    const passwordMatch = await (0, import_bcrypt.compare)(password, user.password);
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
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(types_default.UsersRepository))
], AuthenticateUserUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUserUseCase
});
