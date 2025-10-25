import { UserModel } from '../models/User.js';

export class UserDAO {
  async create(userData) {
    return await UserModel.create(userData);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async updatePassword(id, newPassword) {
    return await UserModel.findByIdAndUpdate(id, { password: newPassword });
  }

  async getAll() {
    return await UserModel.find();
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}
