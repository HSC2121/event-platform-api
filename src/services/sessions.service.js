import { UsersRepository } from "../repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

const usersRepository = new UsersRepository();

export class SessionsService {
  async register(userData) {
    const { first_name, last_name, email, password } = userData;

    if (!first_name || !last_name || !email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      const error = new Error("Invalid email format");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters long");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await usersRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await createHash(password);

    const newUser = await usersRepository.createUser({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    return {
      id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role
    };
  }

  async login(credentials) {
    const { email, password } = credentials;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await usersRepository.findByEmail(normalizedEmail);

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const passwordMatches = await isValidPassword(password, user.password);

    if (!passwordMatches) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    };
  }

  getCurrentUser(user) {
    return {
      id: user.id,
      email: user.email,
      role: user.role
    };
  }

  getStatus() {
    return {
      message: "Sessions service available",
      authEnabled: true
    };
  }
}