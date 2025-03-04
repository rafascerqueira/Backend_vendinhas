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

// src/domain/application/shared/errors/JWTInvalidTokenError.ts
var JWTInvalidTokenError_exports = {};
__export(JWTInvalidTokenError_exports, {
  JWTInvalidTokenError: () => JWTInvalidTokenError
});
module.exports = __toCommonJS(JWTInvalidTokenError_exports);

// src/domain/application/shared/errors/AppError.ts
var AppError = class {
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/domain/application/shared/errors/JWTInvalidTokenError.ts
var JWTInvalidTokenError = class extends AppError {
  constructor() {
    super("Ouch! It's a invalid token.", 401);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JWTInvalidTokenError
});
