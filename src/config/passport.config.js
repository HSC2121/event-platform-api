import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { config } from "./env.config.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hash.js";

const usersRepository = new UsersRepository();

const cookieExtractor = req => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies.currentUser;
  }

  return token;
};

const toSafeUser = user => {
  return {
    id: user._id || user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role
  };
};

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name } = req.body;

          if (!first_name || !last_name || !email || !password) {
            return done(null, false, {
              message: "All fields are required"
            });
          }

          const normalizedEmail = email.trim().toLowerCase();

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailRegex.test(normalizedEmail)) {
            return done(null, false, {
              message: "Invalid email format"
            });
          }

          if (password.length < 6) {
            return done(null, false, {
              message: "Password must be at least 6 characters long"
            });
          }

          const existingUser = await usersRepository.findByEmail(normalizedEmail);

          if (existingUser) {
            return done(null, false, {
              message: "Email already registered"
            });
          }

          const hashedPassword = await createHash(password);

          const newUser = await usersRepository.createUser({
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            email: normalizedEmail,
            password: hashedPassword
          });

          return done(null, toSafeUser(newUser));
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          if (!email || !password) {
            return done(null, false, {
              message: "Invalid credentials"
            });
          }

          const normalizedEmail = email.trim().toLowerCase();

          const user = await usersRepository.findByEmail(normalizedEmail);

          if (!user) {
            return done(null, false, {
              message: "Invalid credentials"
            });
          }

          const passwordMatches = await isValidPassword(password, user.password);

          if (!passwordMatches) {
            return done(null, false, {
              message: "Invalid credentials"
            });
          }

          return done(null, toSafeUser(user));
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwtSecret
      },
      async (jwtPayload, done) => {
        try {
          return done(null, {
            id: jwtPayload.id,
            email: jwtPayload.email,
            role: jwtPayload.role
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};