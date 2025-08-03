

import express from 'express'
import { createProfile, getProfile } from '../controller/profilecontroller.js';

const router=express.Router();

router.post('/create',createProfile);
router.get('/get',getProfile);

export default router;