import { UserRepository } from '../repositories/UserRepository.js';
import { UserDTO } from '../dto/UserDTO.js';

const userRepo = new UserRepository();


export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    console.log('📥 Datos recibidos para registro:', req.body);

    const user = await userRepo.register(req.body);
    res.status(201).json(new UserDTO(user));
  } catch (err) {
    console.error('❌ Error en registerUser:', err.message);
    res.status(400).json({ error: err.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await userRepo.getAll();
    const dtos = users.map(u => new UserDTO(u));
    res.json(dtos);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


export const deleteUser = async (req, res) => {
  try {
    await userRepo.delete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error('❌ Error al eliminar usuario:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
