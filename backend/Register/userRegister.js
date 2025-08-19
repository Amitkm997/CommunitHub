import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const register = async (req, res) => {    
    try {
        const { name, email, password } = req.body;

        if (!name) res.status(404).send({ message: "Name not found!" })
        if (!email) res.status(404).send({ message: "email not found" })
        if (!password) res.status(404).send({ message: "password not found" })

        if (!emailRegex.test(email)) return res.status(400).send({ message: "Invalid email" })
        if (!passwordRegex.test(password)) return res.status(400).send({ message: "Invalid Password" })

        let existUser = await User.findOne({ email })
        if (existUser) res.status(400).send({ message: "user already registered" })

        let hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await User.create({ name, email, password: hashedPassword })
        res.status(201).send({ message: "user registered successfully", newUser: newUser })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
}

export const logIn=async (req,res) => {
    const{email,password}=req.body;
    if(!email) res.status(404).send({message:"please provide email"});
    if(!password) res.status(404).send({message:"please provide password"})
 
    if (!emailRegex.test(email)) return res.status(400).send({ message: "Invalid email" })
    if (!passwordRegex.test(password)) return res.status(400).send({ message: "Invalid Password" })

    let existUser=await User.findOne({email})
    if(!existUser) res.status(404).send({message:"user not found plese register first"})
    
    let comparePassword=await bcrypt.compare(password,existUser.password)
    if(!comparePassword) return res.status(400).send({message:"Invalid password or password mismatched"});

    let payload={
        userId:existUser._id,
        email:email
    }
    const token= await jwt.sign(payload,"This is a secret key");
    res.status(200).send({message:"token generated successfully",token:token});
}