const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

import User from '../models/user.model';
import config from './config';

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.sub == "das-build-agent") {
      var user = {
        sub: jwt_payload.sub,
        name: jwt_payload.name,
        port: jwt_payload.port
      };

      return done(null, user);
    }

    User.getUserById(jwt_payload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}