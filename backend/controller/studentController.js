import Student from "../models/studentModel.js"

export const createStudent=async(req,res)=>{
    const{name,age}=req.body 
    const newStudent=await Student.create({name,age});
    res.status(201).send({message:"student created successfully",student:newStudent})
}

export const findStudent=async(req,res)=>{
    // const student=await Student.find({name:{$in:["Amit","chirag"]}});
    const student=await Student.find().select('name createdAt')
    res.send(student)
}

export const updateStudent=async(req,res)=>{
    // const{name,age}=req.body;
    let updatedStudent=await Student.updateMany({name:"Amit"},{$inc:{age:-1}})
    res.send(updatedStudent)
}

export const deleteStudent=async(req,res)=>{
    // const{name}=req.body
   await Student.deleteMany({isEnrolled:false})
   res.status(200).send("deleted user successfully")
}

export const filterByAge=async(req,res)=>{
    let student=await Student.find();
    let filteredAge= student.filter((cur)=>cur.age<18);
    res.send(filteredAge)
}