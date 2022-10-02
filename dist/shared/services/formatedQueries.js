"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatedOrder = void 0;
/**
 *
 * @param query - Database query return
 * @returns An object IFormatedOrder
 */
const formatedOrder = (query) => {
    return {
        id: query === null || query === void 0 ? void 0 : query.id,
        amount: query === null || query === void 0 ? void 0 : query.amount.toString(),
        customer: query === null || query === void 0 ? void 0 : query.customer.name,
        products: query === null || query === void 0 ? void 0 : query.products.map((prod) => {
            let value = "";
            prod.product.price.map((el) => (value = el.value.toString()));
            let format = {
                name: prod.product.name,
                description: prod.product.description,
                price: value,
                quantity: prod.quantity,
            };
            return format;
        }),
        created_at: query === null || query === void 0 ? void 0 : query.created_at,
        updated_at: query === null || query === void 0 ? void 0 : query.updated_at,
    };
};
exports.formatedOrder = formatedOrder;
//# sourceMappingURL=formatedQueries.js.map