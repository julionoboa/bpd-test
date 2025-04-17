import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../utils/constants';

export const validateInternalAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  const apiSecret = req.headers['x-api-secret'];

  if (
    apiKey === process.env.INTERNAL_API_KEY &&
    apiSecret === process.env.INTERNAL_API_SECRET
  ) {
    return next();
  }

  res.status(403).json({ error: MESSAGES.UNAUTHORIZED_INTERNAL });
};