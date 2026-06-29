import { UsersDao } from "../dao/users.dao.js";

const usersDao = new UsersDao();

export class UsersRepository {
  async findByEmail(email) {
    return await usersDao.findByEmail(email);
  }

  async createUser(userData) {
    return await usersDao.createUser(userData);
  }
}
