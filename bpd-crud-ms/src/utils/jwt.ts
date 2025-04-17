import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || '300', 10);

export const generateToken = (payload: object, expiresIn: number = JWT_EXPIRES_IN): string => {
    const options: SignOptions = {
        expiresIn,
    };
  return jwt.sign(payload, JWT_SECRET, options);
};