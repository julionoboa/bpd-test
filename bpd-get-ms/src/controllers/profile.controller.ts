import { Request, Response } from 'express';
import Profile from '../models/profile.model';
import axios from 'axios';
import { AUTH, HEADERS, MESSAGES } from '../utils/constants';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

const CRUD_MS_URL = process.env.CRUD_MS_URL;

export const getOwnProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith(HEADERS.AUTH_PREFIX) || !authHeader) {
      res.status(401).json({ error: MESSAGES.ERROR.MISSING_TOKEN });
      return;
    }

    try {
      const response = await axios.get(`${CRUD_MS_URL}/api/internal/verify-token`, {
        headers: {
          'x-api-key': AUTH.INTERNAL.API_KEY,
          'x-api-secret': AUTH.INTERNAL.API_SECRET,
          Authorization: authHeader,
        },
      });

      const {userId} = response.data.payload;

      const profile = await Profile.findById(userId);

      if (!profile) {
        res.status(404).json({ message: MESSAGES.ERROR.USER_NOT_FOUND });
        return;
      }

      // Saving the log
      await axios.post(`${CRUD_MS_URL}/api/internal/save-logs`, {
        userId: profile._id,
        action: 'READ',
        message: 'User profile viewed'
      }, {
        headers: {
          'x-api-key': AUTH.INTERNAL.API_KEY,
          'x-api-secret': AUTH.INTERNAL.API_SECRET,
        }
      });

      res.status(200).json(profile);

    } catch (error: any) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || MESSAGES.ERROR.SERVER_ERROR;
      res.status(status).json({ error: message });
    }
};

export const getProfile = async (req: Request, res: Response): Promise<void>=> {
  const authHeader = req.headers.authorization;

  if (!authHeader && !authHeader?.startsWith(HEADERS.AUTH_PREFIX)) {
    const email = req.headers[HEADERS.USER_EMAIL] as string;
    if (!email) {
      res.status(400).json({ error: MESSAGES.ERROR.MISSING_EMAIL_HEADER });
      return;
    }
    try {
      const profile = await Profile.findOne({ email });
      if (!profile) {
        res.status(404).json({ message: MESSAGES.ERROR.USER_NOT_FOUND });
        return;
      }
  
      res.json(profile);
    } catch (err) {
      res.status(500).json({ error: MESSAGES.ERROR.SERVER_ERROR }); 
    }
  } else {
    try {
      const response = await axios.get(`${CRUD_MS_URL}/api/internal/verify-token`, {
        headers: {
          'x-api-key': process.env.INTERNAL_API_KEY,
          'x-api-secret': process.env.INTERNAL_API_SECRET,
          Authorization: authHeader,
        },
      });

      const { userId } = response.data.payload;

      const profile = await Profile.findById(userId);

      if (!profile) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(profile);
    } catch (error: any) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || 'Error validating token';
      res.status(status).json({ error: message });
    }
  }
};