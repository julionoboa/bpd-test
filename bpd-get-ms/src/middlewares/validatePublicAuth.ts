import { Request, Response, NextFunction } from 'express';
import { AUTH, HEADERS, MESSAGES } from '../utils/constants';

export const validatePublicAuth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers[HEADERS.API_KEY!]
  const apiSecret = req.headers[HEADERS.API_SECRET!];

  if (
    apiKey !== AUTH.PUBLIC.API_KEY ||
    apiSecret !== AUTH.PUBLIC.API_SECRET
  ) {
    res.status(401).json({ error: MESSAGES.ERROR.UNAUTHORIZED_PUBLIC_REQUEST });
    return;
  }

  next();
};