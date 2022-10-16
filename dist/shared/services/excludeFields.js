"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclude = void 0;
// Exclude keys from user
function exclude(entity, ...keys) {
    for (let key of keys) {
        delete entity[key];
    }
    return entity;
}
exports.exclude = exclude;
//# sourceMappingURL=excludeFields.js.map