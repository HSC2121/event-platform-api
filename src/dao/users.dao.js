import { UserModel } from "../models/user.model.js";

export class UsersDao {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async createUser(userData) {
    return await UserModel.create(userData);
  }
}