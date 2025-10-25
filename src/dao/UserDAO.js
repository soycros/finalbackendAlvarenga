import userModel from '../models/userModel.js';

export class UserDAO {
  async create(userData) {
    return await userModel.create(userData);
  }

  async findByEmail(email) {
    return await userModel.findOne({ email });
  }

  async findById(id) {
    return await userModel.findById(id);
  }

  async updatePassword(id, newPassword) {
    return await userModel.findByIdAndUpdate(id, { password: newPassword });
  }

  async getAll() {
    return await userModel.find();
  }

  async delete(id) {
    return await userModel.findByIdAndDelete(id);
  }
}
