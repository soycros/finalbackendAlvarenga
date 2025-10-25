import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository.js';
import { sendResetEmail } from '../services/mail.service.js';
import { validatePassword, createHash } from '../utils/encrypt.js';

const userRepo = new UserRepository();
const SECRET = process.env.JWT_SECRET || '3f$9K!z@7Lq#xP2vTg^B8mZrWq*Yd';

export const requestReset = async (req, res) => {
  const { email } = req.body;
  const user = await userRepo.getByEmail(email);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
  await sendResetEmail(email, token);
  res.json({ message: 'Correo enviado' });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: 'La nueva contraseña es obligatoria' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await userRepo.getById(decoded.id);

    if (validatePassword(user, newPassword)) {
      return res.status(400).json({ error: 'La nueva contraseña no puede ser igual a la anterior' });
    }

    const hashedPassword = createHash(newPassword);
    await userRepo.updatePassword(user._id, hashedPassword);

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
