import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userModel from '../models/userModel.js'; // Asegurate que esta ruta sea correcta

const SECRET = process.env.JWT_SECRET || '3f$9K!z@7Lq#xP2vTg^B8mZrWq*Yd';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

passport.use(
  'jwt',
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await userModel.findById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
