import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || '3f$9K!z@7Lq#xP2vTg^B8mZrWq*Yd';

export const generateToken = payload => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

export const verifyToken = token => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
