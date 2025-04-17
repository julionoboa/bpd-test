import express from 'express';
import { validateInternalAuth } from '../middlewares/validateInternalAuth';
import { getProfile } from '../controllers/profile.controller';
import { validatePublicAuth } from '../middlewares/validatePublicAuth';
import { getOwnProfile } from '../controllers/profile.controller';
import { ROUTES } from '../utils/constants';

const router = express.Router();

router.get(ROUTES.INTERNAL.GET_PROFILE, validateInternalAuth, getProfile);
router.get(ROUTES.PUBLIC.GET_OWN_PROFILE, validatePublicAuth, getOwnProfile);

export default router;