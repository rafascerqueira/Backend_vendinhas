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

// src/domain/application/shared/services/formatedQueries.ts
var formatedQueries_exports = {};
__export(formatedQueries_exports, {
  formatedOrder: () => formatedOrder
});
module.exports = __toCommonJS(formatedQueries_exports);
var formatedOrder = (query) => {
  return {
    id: query?.id,
    amount: query?.amount.toString(),
    customer: query?.customer.name,
    products: query?.products.map((prod) => {
      let value = "";
      prod.product.price.map((el) => value = el.value.toString());
      let format = {
        name: prod.product.name,
        description: prod.product.description,
        price: value,
        quantity: prod.quantity
      };
      return format;
    }),
    created_at: query?.created_at,
    updated_at: query?.updated_at
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatedOrder
});
