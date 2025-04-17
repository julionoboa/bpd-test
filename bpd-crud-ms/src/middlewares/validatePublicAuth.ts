import { Request, Response, NextFunction } from 'express';
import { HEADERS, MESSAGES } from '../utils/constants';

export const validatePublicAuth = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers[HEADERS.API_KEY];
  const apiSecret = req.headers[HEADERS.API_SECRET];

  if (
    apiKey !== process.env.API_KEY ||
    apiSecret !== process.env.API_SECRET
  ) {
    res.status(401).json({ error: MESSAGES.UNAUTHORIZED_PUBLIC });
    return;
  }

  next();
};