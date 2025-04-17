import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HEADERS, MESSAGES } from '../utils/constants';
import { saveLog } from '../utils/saveLog';

export const verifyToken = (req: Request, res: Response): void => {
  
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith(HEADERS.AUTH_PREFIX)) {
    res.status(401).json({ error: MESSAGES.MISSING_TOKEN_ERROR });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.status(200).json({ valid: true, payload: decoded });
  } catch (error) {
    res.status(403).json({ valid: false, error: MESSAGES.INVALID_TOKEN_ERROR });
  }
};

export const saveLogController = async (req: Request, res: Response): Promise<void> => {
  const { userId, action, message } = req.body;

  if (!userId || !action) {
    res.status(400).json({ error: 'Missing required fields' });
    return
  }

  try {
    await saveLog(userId, action, message);
    res.status(201).json({ message: 'Log saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save log' });
  }
};