"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../database"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const salt = parseInt(process.env.SALT) || 10;
const UserSchema = new _database.default.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  fullname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  }
});
UserSchema.pre("save", async function (next) {
  const hash = await _bcryptjs.default.hash(this.password, salt);
  this.password = hash;
  next();
});

const User = _database.default.model("User", UserSchema);

var _default = User;
exports.default = _default;
//# sourceMappingURL=User.js.map