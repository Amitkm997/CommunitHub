

import express from 'express'
import { createProfile, getProfile } from '../controller/profilecontroller.js';
import { authentication } from '../middleware/auth.js';
// import cloudinary from "../config/cloudinary.js";
// import upload from "../middleware/multer.js";
const router=express.Router();
import upload from '../middleware/multer.js';   // <-- import multer middleware


router.post('/create',authentication, upload.single("image"),createProfile);
router.get('/get',authentication,getProfile);

//profile upload route
router.post("/upload", upload.single("image"), (req, res) => {
    try {
      res.json({
        message: "File uploaded successfully!",
        file: req.file, // multer stores file info here
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;