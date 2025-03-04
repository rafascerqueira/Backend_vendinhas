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

// src/domain/application/shared/services/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  default: () => authenticate_default
});
module.exports = __toCommonJS(authenticate_exports);

// src/domain/application/shared/services/token.ts
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

// src/domain/application/shared/services/token.ts
var verify = (token) => import_jsonwebtoken.default.verify(token, auth_default.jwt.publicKey, (err, data) => {
  if (err) throw err;
  return data;
});

// src/domain/application/shared/services/authenticate.ts
var authenticate_default = (request, response, next) => {
  const handleAuthError = (name, message) => {
    response.status(401).json({ error: { name, message } });
  };
  const authHeader = request.headers["authorization"];
  if (!authHeader)
    return handleAuthError(
      "AuthHeaderError",
      "Please, sign in to granted access"
    );
  try {
    const token = authHeader.split(" ")[1];
    if (!token)
      return handleAuthError("UnsetTokenError", "There is no token provided");
    verify(token);
  } catch (error) {
    return response.status(401).json({ error });
  }
  next();
};
