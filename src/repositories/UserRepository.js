import { UserDAO } from '../dao/UserDAO.js';
import { createHash, validatePassword } from '../utils/encrypt.js';

const userDAO = new UserDAO();

export class UserRepository {
  async register(userData) {
    const { email, password, first_name, last_name, age } = userData;

    if (!email || !password || !first_name || !last_name || !age) {
      throw new Error('Todos los campos son obligatorios');
    }

    const existingUser = await userDAO.findByEmail(email);
    if (existingUser) throw new Error('El usuario ya existe');

    const hashedPassword = createHash(password);
    const newUser = {
      ...userData,
      password: hashedPassword
    };

    return await userDAO.create(newUser);
  }

  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }

    const user = await userDAO.findByEmail(email);
    if (!user || !validatePassword(user, password)) {
      throw new Error('Credenciales inválidas');
    }

    return user;
  }

  async getById(id) {
    if (!id) throw new Error('ID requerido');
    return await userDAO.findById(id);
  }

  async getAll() {
    return await userDAO.getAll();
  }

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    return await userDAO.delete(id);
  }

  async updatePassword(id, newPassword) {
    if (!id || !newPassword) {
      throw new Error('ID y nueva contraseña son obligatorios');
    }

    const hashed = createHash(newPassword);
    return await userDAO.updatePassword(id, hashed);
  }
}
