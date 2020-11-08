"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _User = _interopRequireDefault(require("../database/mongodb/models/User"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const secret = process.env.AUTH_SECRET;

function _default() {
  const opts = {
    secretOrKey: secret,
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  const strategy = new _passportJwt.Strategy(opts, (payload, done) => {
    _User.default.findById(payload.id, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });

  _passport.default.use(strategy);

  return {
    authenticate: () => _passport.default.authenticate("jwt", {
      session: false
    })
  };
}
//# sourceMappingURL=passport.js.map