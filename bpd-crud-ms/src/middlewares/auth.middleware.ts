import { Request, Response, NextFunction } from 'express';
import { CustomRequest, JwtPayload } from '../utils/types';
import jwt from 'jsonwebtoken';
import { HEADERS, MESSAGES } from '../utils/constants';


export const authenticateUser = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith(HEADERS.AUTH_PREFIX)) {
    res.status(401).json({ error: MESSAGES.MISSING_TOKEN_ERROR });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: MESSAGES.INVALID_TOKEN_ERROR });
  }
};