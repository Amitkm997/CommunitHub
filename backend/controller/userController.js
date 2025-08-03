import User from "../models/userModel.js";
// export const createUser=(req,res)=>{
//     const{name,email,password}=req.body;
     
//     const newUser=new User({
//         name,
//         email,
//         password
//     })
//     newUser.save()
//     res.send({message:"user Created successfuly",newUser:newUser})
// }

export const createUser=async(req,res)=>{
    const{name,email,password}=req.body;
    if(!name){
        return res.send("please provide name")
    }
    let existingemail=await User.find({email});
    if(existingemail) return res.send("user already exists")
    let newUser=await User.create(req.body);
    res.status(201).send({message:'user created successfully',newUser:newUser})
}

// export const createUser=async(req,res)=>{
//     const{name,email,password}=req.body;
//     if(!name){
//         return res.send("please provide name")
//     }
//     let newUser=await User.insertOne({name,email,password});
//     res.status(201).send({message:'user created successfully',newUser:newUser})
// }


// export const createUser=async(req,res)=>{
//     // const{name,email,password}=req.body;
//     console.log(req.body)
//     let newUser=await User.insertMany(req.body)
//     res.status(201).send({message:"user createed successfully",newUser:newUser})
// }


// export const getAllUsers=async(req,res)=>{
//     let users=await User.find({name:"abhay"});
//     // if(users.length<1){
//     //     console.log("data not found")
//     // }
//     res.status(200).send({message:"users fetched successfully",users:users})
// }

export const getAllUsers=async(req,res)=>{
    let users=await User.findOne({name:"abhay"})
    console.log(users)
    if(!users){
        console.log("data not found")
    }
    res.send(users)
}

