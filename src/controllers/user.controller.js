import { UserRepository } from '../repositories/UserRepository.js';
import { UserDTO } from '../dto/UserDTO.js';

const userRepo = new UserRepository();

export const registerUser = async (req, res) => {
  try {
    const user = await userRepo.register(req.body);
    res.status(201).json(new UserDTO(user));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await userRepo.getAll();
  const dtos = users.map(u => new UserDTO(u));
  res.json(dtos);
};

export const deleteUser = async (req, res) => {
  await userRepo.delete(req.params.id);
  res.json({ message: 'Usuario eliminado' });
};
