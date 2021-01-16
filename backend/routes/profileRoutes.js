import express from 'express'
const router = express.Router()
import {protect} from '../middleware/authMiddleware.js'

import {myProfile, createUpdateProfile, getProfiles, getProfileByID, deleteProfile} from '../controllers/profileController.js'

router.route('/me').get(protect, myProfile)

router.route('/').post(protect, createUpdateProfile)

router.route('/').get(getProfiles)

router.route('/user/:user_id').get(getProfileByID)

router.route('/').delete(protect, deleteProfile)

export default router