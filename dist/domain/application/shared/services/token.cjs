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

// src/domain/application/shared/services/token.ts
var token_exports = {};
__export(token_exports, {
  decode: () => decode,
  sign: () => sign,
  verify: () => verify
});
module.exports = __toCommonJS(token_exports);
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
var sign = (user) => {
  const payload = { id: user.id, role: user.role };
  return import_jsonwebtoken.default.sign(payload, auth_default.jwt.privateKey, {
    algorithm: "RS256",
    expiresIn: "15m"
  });
};
var decode = (token) => import_jsonwebtoken.default.decode(token);
var verify = (token) => import_jsonwebtoken.default.verify(token, auth_default.jwt.publicKey, (err, data) => {
  if (err) throw err;
  return data;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decode,
  sign,
  verify
});
