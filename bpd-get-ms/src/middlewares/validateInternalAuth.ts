import { Request, Response, NextFunction } from 'express';
import { AUTH, HEADERS, MESSAGES } from '../utils/constants';

export const validateInternalAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers[HEADERS.API_KEY];
  const apiSecret = req.headers[HEADERS.API_SECRET];

  if (
    apiKey === AUTH.INTERNAL.API_KEY &&
    apiSecret === AUTH.INTERNAL.API_SECRET
  ) {
    return next();
  }

  res.status(403).json({ error: MESSAGES.ERROR.UNAUTHORIZED_ACCESS });
};