

import express from "express";
import {createUser, getAllUsers} from '../controller/userController.js'

const router=express.Router();

router.post('/create',createUser);
router.get("/getUser",getAllUsers)

export default router;