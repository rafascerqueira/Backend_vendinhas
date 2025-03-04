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

// src/domain/application/shared/infra/middlewares/ensureAuthentication.ts
var ensureAuthentication_exports = {};
__export(ensureAuthentication_exports, {
  ensureAAuthentication: () => ensureAAuthentication
});
module.exports = __toCommonJS(ensureAuthentication_exports);
var import_jsonwebtoken = require("jsonwebtoken");

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

// src/domain/application/shared/errors/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/domain/application/shared/errors/JWTTokenMissingError.ts
var JWTTokenMissingError = class extends AppError {
  constructor() {
    super("Oops! we don't have a Token.", 401);
  }
};

// src/domain/application/shared/errors/JWTInvalidTokenError.ts
var JWTInvalidTokenError = class extends AppError {
  constructor() {
    super("Ouch! It's a invalid token.", 401);
  }
};

// src/domain/application/shared/infra/middlewares/ensureAuthentication.ts
async function ensureAAuthentication(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new JWTTokenMissingError();
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = (0, import_jsonwebtoken.verify)(token, auth_default.jwt.secret);
    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new JWTInvalidTokenError();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ensureAAuthentication
});
