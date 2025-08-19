

import express from "express";
import {createUser, getAllUsers} from '../controller/userController.js'
import { register ,logIn} from "../Register/userRegister.js";
const router=express.Router();

router.post('/create',createUser);
router.get("/getUser",getAllUsers)

//Register
router.post('/register',register)
router.post('/logIn',logIn)

export default router;