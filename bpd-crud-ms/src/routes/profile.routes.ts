import express from 'express';
import { createProfile, deleteProfile, updateProfile } from '../controllers/profile.controller';
import { validatePublicAuth } from '../middlewares/validatePublicAuth';
import { validateInternalAuth } from '../middlewares/validateInternalAuth';
import { saveLogController, verifyToken } from '../controllers/internal.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { ROUTES } from '../utils/constants';
import { getUserLogs } from '../controllers/log.controller';

const router = express.Router();
//Public Routes
router.post(ROUTES.PUBLIC.CREATE_PROFILE, createProfile);
router.delete(ROUTES.PUBLIC.DELETE_PROFILE, validatePublicAuth, authenticateUser, deleteProfile);
router.put(ROUTES.PUBLIC.UPDATE_PROFILE, validatePublicAuth, authenticateUser, updateProfile);
router.get(ROUTES.PUBLIC.GET_LOGS, validatePublicAuth, authenticateUser, getUserLogs);

//Internal Routes
router.post(ROUTES.INTERNAL.SAVE_LOGS, validateInternalAuth, saveLogController);
router.get(ROUTES.INTERNAL.VERIFY_TOKEN, validateInternalAuth, verifyToken);


export default router;