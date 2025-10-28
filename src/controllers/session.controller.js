  import jwt from 'jsonwebtoken';
  import { UserRepository } from '../repositories/UserRepository.js';
  import { UserDTO } from '../dto/UserDTO.js';

  const userRepo = new UserRepository();
  const SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userRepo.login(email, password);
      const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  };

  export const currentUser = async (req, res) => {
    try {
      const dto = new UserDTO(req.user);
      res.json(dto);
    } catch (err) {
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
  };
