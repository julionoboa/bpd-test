import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HEADERS, MESSAGES } from '../utils/constants';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    iat: number;
    exp: number;
  };
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith(HEADERS.AUTH_PREFIX)) {
    res.status(401).json({ error: MESSAGES.ERROR.MISSING_TOKEN });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthenticatedRequest['user'];
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: MESSAGES.ERROR.INVALID_TOKEN });
  }
};