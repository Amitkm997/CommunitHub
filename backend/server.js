
import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.js'
import studentRoute from './routes/studentRoute.js'
import profileRroutes from './routes/profileRoutes.js'
import postRoutes from './routes/postRoutes.js'
import dotenv from "dotenv";
dotenv.config();

let app=express();//initilizing express
app.use(express.json());//parses incoming request body

mongoose.connect("mongodb+srv://amitkm997:DORTPNz50hrj3uFV@cluster0.ybxpqio.mongodb.net/newProject").
then(()=>console.log("mongodb connected successfully")).
catch((err)=>console.log(err))

//common route
app.use('/user',userRoutes)
app.use('/student',studentRoute)
app.use('/profile',profileRroutes)
app.use('/post',postRoutes)
app.listen(process.env.PORT,()=>{
    console.log("server running on port "+process.env.PORT)
})

//mongodb+srv://amitkm997:DORTPNz50hrj3uFV@cluster0.ybxpqio.mongodb.net/