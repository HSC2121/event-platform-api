import { generateToken } from "../utils/jwt.js";

export class SessionsService {
  generateAuthToken(user) {
    return generateToken({
      id: user.id || user._id,
      email: user.email,
      role: user.role
    });
  }

  getPublicUser(user) {
    return {
      id: user.id || user._id,
      email: user.email,
      role: user.role
    };
  }

  getRegisteredUser(user) {
    return {
      id: user.id || user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role
    };
  }

  getStatus() {
    return {
      message: "Sessions service available",
      authEnabled: true,
      strategy: "passport"
    };
  }
}