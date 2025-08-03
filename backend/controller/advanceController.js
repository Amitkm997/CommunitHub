import Post from "../models/PostModel.js"
export const getJulyPost=async(req,res)=>{
    try{
       let julyPost=await Post.aggregate([
        {
         $match:{
            createdAt:{
                $gte:new Date('2025-08-19'),
                $lte:new Date('2025-08-31')
            }
         }   
        }
       ])
       if(julyPost.length==0) return res.status(404).json({message:"no post available for july"})
       res.status(200).json({message:"all posts of july",post:julyPost})
    }catch(err){
        console.log(err)
    }
}

//post per user

export const postPerUser = async (req, res) => {
    try{
       let postperuser=await Post.aggregate([
          {
            $group:{
              _id:'$user',
              totalPost:{$sum:1}
            }
          }
       ])
       res.status(200).json({message:"post fetched successfully",postPeruser:postperuser})
    }catch(err){
      console.log(err)
    }
};

// Total likes per user

export const totalLikedByUsers=async (req,res) => {
    try{
      let totallikes=await Post.aggregate([
        {
          $project:{
            likescount:{'$size':{'$ifNull':['$likedBy',[]]}}
          }
        },
        {
          $group:{
            _id:'$user',
            totalLikes:{'$sum':'$likescount'}
          }
        }
      ])
      res.status(201).send({message:'successfully fetched total no. of likes',totallikes:totallikes})
    }catch(err){
      console.log(err)
    }
}


//avg likes 
export const avgLikes=async (req,res) => {
  try{
    let avglikes=await Post.aggregate([
      {
        $project:{
          likescount:{'$size':{'$ifNull':['$likedBy',[]]}}
        }
      },
      {
        $group:{
          _id:'$user',
          avgLikes:{'$avg':'$likescount'}
        }
      }
    ])
    res.status(201).send({message:'successfully fetched avglikes likes',avglikes:avglikes})
  }catch(err){
    console.log(err)
  }
}

//simple post

export const simplePost=async (req,res) => {
     try{
        let simplepost=await Post.aggregate([
          {
            $project:{
                _id:0, // to be hide
                title:1, // to be shown
                summary:'$content'// for renaming the content field to summary
            }
          }
        ])
        res.status(201).send({message:"showing only important fields",simplepost:simplepost})
     }catch(err){
        console.log(err)
     }
}

export const postsWithAuthors =async (req,res) => {
     let postDetailwithUser=await Post.aggregate([
      {
        $lookup:{
           from:'users',
           localField:'user',
           foreignField:'_id',
           as:'userDetails'
        }
      }
     ])
     res.send(postDetailwithUser)
}