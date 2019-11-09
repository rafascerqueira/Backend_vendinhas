"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = exports.signin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _User = _interopRequireDefault(require("../models/User"));

var _validation = require("./validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const secret = process.env.AUTH_SECRET;

const signin = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  try {
    (0, _validation.emptyOrNull)(email, "E-mail não informado");
    (0, _validation.emptyOrNull)(password, "Senha não informada");
    const user = await _User.default.findOne({
      email
    }).select("+password");
    (0, _validation.emptyOrNull)(user, "Usuário não encontrado");
    const isMatch = await _bcryptjs.default.compare(password, user.password);
    if (!isMatch) throw "E-mail / Senha inválidos!";
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      id: user.id,
      name: user.fullname,
      admin: user.admin,
      iat: now,
      exp: now + Math.pow(60, 2) * 24 * 1
    };
    res.json({ ...payload,
      token: _jsonwebtoken.default.sign(payload, secret)
    });
  } catch (err) {
    res.status(400).send({
      erro: `${err}`
    });
  }
};

exports.signin = signin;

const validateToken = async (req, res) => {
  const user = req.body || null;

  try {
    if (user) {
      const token = _jsonwebtoken.default.decode(user.token, secret);

      const result = (0, _validation.isTokenExpired)(token);
      res.send(result);
    }
  } catch (err) {
    res.status(403).send({
      Erro: `${err}`
    });
  }
};

exports.validateToken = validateToken;
//# sourceMappingURL=auth.js.map