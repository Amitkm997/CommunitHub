import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();
console.log("Cloudinary Config:", process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export default cloudinary;
