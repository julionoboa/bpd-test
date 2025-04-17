import { Request, Response } from 'express';
import Log from '../models/logs.model';
import { CustomRequest } from '../utils/types';

export const getUserLogs = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: Missing user ID' });
      return;
    }

    const logs = await Log.find({ userId }).sort({ timestamp: -1 });

    if (!logs.length) {
      res.status(404).json({ message: 'No logs found for this user' });
      return;
    }

    res.status(200).json({ logs });
  } catch (error) {
    console.error('Error retrieving logs:', error);
    res.status(500).json({ error: 'Server error retrieving logs' });
  }
};