import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/User";

import "dotenv/config";
const secret = process.env.AUTH_SECRET;

export default function () {
  const opts = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  const strategy = new Strategy(opts, (payload, done) => {
    User.findById(payload.id, (err, user) => {
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

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate("jwt", { session: false }),
  };
}
