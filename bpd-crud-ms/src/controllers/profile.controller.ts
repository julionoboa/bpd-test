import { Request, Response } from 'express';
import Profile from '../models/profile.model';
import { generateToken } from '../utils/jwt';
import { CustomRequest } from '../utils/types';
import { profileSchema } from '../validations/profile.validation';
import axios from 'axios';
import { AUTH, HEADERS, LogActions, MESSAGES } from '../utils/constants';
import { saveLog } from '../utils/saveLog';

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  const validation = profileSchema.safeParse(req.body);

  if (!validation.success) {
    const errors = validation.error.errors.map(e => e.message);
    res.status(400).json({ error: MESSAGES.VALIDATION_FAILED, details: errors });
    return;
  }

  const { email } = req.body;


  if (!email) {
    res.status(400).json({ error: MESSAGES.EMAIL_REQUIRED });
    return;
  }

  try {
    const response = await axios.get(`${process.env.BPD_GET_MS_URL}/api/internal/get-profile`, {
      headers: {
        'x-api-key': AUTH.INTERNAL.API_KEY!,
        'x-api-secret': AUTH.INTERNAL.API_SECRET!,
        'x-user-email': email
      }
    });


    if (response.data) {
      const token = generateToken({ userId: response.data._id, email: response.data.email });
      res.status(200).json({ message: MESSAGES.PROFILE_ALREADY_EXISTS, token, user: response.data });
      return;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log('Profile not found in microservice, creating new one...');
    } else {
      res.status(500).json({ error: 'Error checking profile in microservice' });
    }
  }

  // Profile wasn't found, we need to create a new one
  try {
    const profile = new Profile(req.body);
    await profile.save();

    const token = generateToken({ userId: profile._id, email: profile.email });
    await saveLog(profile._id.toString(), LogActions.CREATE, 'User profile created');
    
    res.status(201).json({ message: MESSAGES.PROFILE_CREATED, token, user: profile });
  } catch (error) {
    res.status(500).json({ error: MESSAGES.CREATING_PROFILE_ERROR });
  }
};

export const deleteProfile = async (req: CustomRequest, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith(HEADERS.AUTH_PREFIX)) {
    res.status(401).json({ error: MESSAGES.MISSING_TOKEN_ERROR });
    return;
  }

  try {
    const response = await axios.get(`${process.env.BPD_GET_MS_URL}/api/internal/get-profile`, {
      headers: {
        'x-api-key': AUTH.INTERNAL.API_KEY!,
        'x-api-secret': AUTH.INTERNAL.API_SECRET!,
        Authorization: authHeader
      }
    });

    const {_id} = response.data;
    const deletedProfile = await Profile.findByIdAndDelete(_id);

    if (!deletedProfile) {
      res.status(404).json({ error: MESSAGES.USER_NOT_FOUND_DATABASE });
      return;
    }

    res.status(200).json({ message: MESSAGES.PROFILE_DELETED, user: deletedProfile });
    await saveLog(_id.toString(), LogActions.DELETE, 'User profile deleted');

  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: MESSAGES.USER_NOT_FOUND_MS });
      return;
    }

    console.error(MESSAGES.ERROR_CONTACTING_MS, error.message);
    res.status(500).json({ error: MESSAGES.VERIFYING_PROFILE_ERROR });
    return;
  }
};

export const updateProfile = async (req: CustomRequest, res: Response): Promise<void> => {
  const validation = profileSchema.safeParse(req.body);

  if (!validation.success) {
    const errors = validation.error.errors.map(e => e.message);
    res.status(400).json({ error: MESSAGES.VALIDATION_FAILED, details: errors });
    return;
  }
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith(HEADERS.AUTH_PREFIX)) {
    res.status(401).json({ error: MESSAGES.MISSING_TOKEN_ERROR });
    return;
  }

  try {
    const response = await axios.get(`${process.env.BPD_GET_MS_URL}/api/internal/get-profile`, {
      headers: {
        'x-api-key': AUTH.INTERNAL.API_KEY!,
        'x-api-secret': AUTH.INTERNAL.API_SECRET!,
        Authorization: authHeader
      }
    });

    const {_id} = response.data;

    const updated = await Profile.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: MESSAGES.USER_NOT_FOUND_DATABASE });
      return;
    }

    res.status(200).json({ message: MESSAGES.PROFILE_UPDATED, user: updated });
    await saveLog(_id.toString(), LogActions.UPDATE, 'User profile updated');

  } catch (error: any) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: MESSAGES.USER_NOT_FOUND_MS });
      return;
    } else {
      console.error(MESSAGES.ERROR_CONTACTING_MS, error.message);
      res.status(500).json({ error: MESSAGES.VERIFYING_PROFILE_ERROR });
      return;
    }
  }
};