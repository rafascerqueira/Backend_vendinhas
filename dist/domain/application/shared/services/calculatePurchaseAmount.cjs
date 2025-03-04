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

// src/domain/application/shared/services/calculatePurchaseAmount.ts
var calculatePurchaseAmount_exports = {};
__export(calculatePurchaseAmount_exports, {
  calculatePurchaseAmount: () => calculatePurchaseAmount
});
module.exports = __toCommonJS(calculatePurchaseAmount_exports);
var calculatePurchaseAmount = async ({
  repository,
  productList
}) => {
  const purchase = [];
  let quantity = [];
  let amount = 0;
  for (const product of productList) {
    const item = await repository.price.findMany({
      where: { product_id: product.product_id, is_current: true }
    });
    quantity.push(product.quantity);
    purchase.push(item);
  }
  const flatList = purchase.reduce((prev, curr) => prev.concat(curr));
  flatList.map((price, indx) => {
    const value = price.value.toNumber();
    amount += value * quantity[indx];
  });
  return amount;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calculatePurchaseAmount
});
