import Profile from "../models/ProfileModel.js";
import User from "../models/userModel.js";

export const createProfile=async(req,res)=>{
    const{email,bio,age}=req.body;
    // user={
    //     _id: new ObjectId('686bd1c307193402768f03fb'),
    //     name: 'Amit',
    //     email: 'amitkm997@gmail.com',
    //     password: '12345678',
    //     __v: 0
    //   }
    // email:"amitkm997@gmail.com"
    let user=await User.findOne({email})
    if(!user) return res.status(404).send({message:"user not found"})
    let profile=await Profile.create({bio,age,user:user._id})
    res.status(201).send({message:"profile created successfully",profile:profile})
}

export const getProfile=async(req,res)=>{
    const{email}=req.body;
    let user=await User.findOne({email})
    let profile=await Profile.findOne({user:user._id}).populate('user');
    res.send({profile:profile});
}