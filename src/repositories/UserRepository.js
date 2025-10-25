import { UserDAO } from '../dao/UserDAO.js';
import { createHash, validatePassword } from '../utils/encrypt.js';

const userDAO = new UserDAO();

export class UserRepository {
  async register(userData) {
    const existingUser = await userDAO.findByEmail(userData.email);
    if (existingUser) throw new Error('El usuario ya existe');

    const hashedPassword = createHash(userData.password);
    const newUser = { ...userData, password: hashedPassword };
    return await userDAO.create(newUser);
  }

  async login(email, password) {
    const user = await userDAO.findByEmail(email);
    if (!user || !validatePassword(user, password)) {
      throw new Error('Credenciales inválidas');
    }
    return user;
  }

  async getById(id) {
    return await userDAO.findById(id);
  }

  async getAll() {
    return await userDAO.getAll();
  }

  async delete(id) {
    return await userDAO.delete(id);
  }

  async updatePassword(id, newPassword) {
    const hashed = createHash(newPassword);
    return await userDAO.updatePassword(id, hashed);
  }
}
