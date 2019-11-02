"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyOrNull = void 0;

const emptyOrNull = (value, msg) => {
  if (!value || null || undefined) throw msg;
  if (Array.isArray(value) && value.length === 0) throw msg;
  if (typeof value === String && !value.trim()) throw msg;
};

exports.emptyOrNull = emptyOrNull;
//# sourceMappingURL=validation.js.map