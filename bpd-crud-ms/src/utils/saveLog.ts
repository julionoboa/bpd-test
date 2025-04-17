import Log from '../models/logs.model';
import { LogAction } from './constants';

export const saveLog = async (
  userId: string,
  action: LogAction,
  message: string
): Promise<void> => {
  try {
    await Log.create({ userId, action, message });
  } catch (error) {
    console.error('Error saving log:', error);
  }
};