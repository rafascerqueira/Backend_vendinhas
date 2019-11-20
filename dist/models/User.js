"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = _interopRequireDefault(require("../database/mongodb"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const salt = _bcryptjs.default.genSaltSync();

const UserSchema = new _mongodb.default.Schema({
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
UserSchema.pre("save", function (next) {
  const hash = _bcryptjs.default.hashSync(this.password, salt);

  this.password = hash;
  next();
});

const User = _mongodb.default.model("User", UserSchema);

var _default = User;
exports.default = _default;
//# sourceMappingURL=User.js.map