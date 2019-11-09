"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTokenExpired = exports.emptyOrNull = void 0;

const emptyOrNull = (value, msg) => {
  if (!value || null || undefined) throw msg;
  if (Array.isArray(value) && value.length === 0) throw msg;
  if (typeof value === String && !value.trim()) throw msg;
};

exports.emptyOrNull = emptyOrNull;

const isTokenExpired = token => {
  let dateExp = token.exp;

  if (new Date(dateExp * 1000) > new Date()) {
    return true;
  } else {
    return false;
  }
};

exports.isTokenExpired = isTokenExpired;
//# sourceMappingURL=validation.js.map