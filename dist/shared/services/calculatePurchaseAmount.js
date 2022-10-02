"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePurchaseAmount = void 0;
const calculatePurchaseAmount = ({ repository, productList, }) => __awaiter(void 0, void 0, void 0, function* () {
    const purchase = [];
    let quantity = [];
    let amount = 0;
    for (const product of productList) {
        const item = yield repository.price.findMany({
            where: { product_id: product.product_id, is_current: true },
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
});
exports.calculatePurchaseAmount = calculatePurchaseAmount;
//# sourceMappingURL=calculatePurchaseAmount.js.map