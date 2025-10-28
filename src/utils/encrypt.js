import bcrypt from 'bcrypt';

export const createHash = password => {
  if (!password || typeof password !== 'string') {
    throw new Error('Contraseña inválida para encriptar');
  }
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const validatePassword = (user, password) => {
  if (!user?.password || !password) return false;
  return bcrypt.compareSync(password, user.password);
};
