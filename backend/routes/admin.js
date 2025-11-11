//  68bd84524b4903b4d74a0107
const {Router} =require("express");
const adminRouter= Router();
const {adminModel, courseModel} =require("../db");
const jwt=require("jsonwebtoken");
// becrypt,zod ,jsonwebtoken for password auth

const { JWT_ADMIN_PASSWORD }=require("../config.js");
const { adminMiddleware } = require("../middleware/admin.js");

 adminRouter.post("/signup",async function(req,res){
   const {email,password,firstName,lastName} = req.body; //instead can use ( email=req.body.email)
// YODO :adding zod validation
// TODO :hash the password so plaintext pw not stored in db

    await adminModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })

    res.json({
        message: "signup succeeded"
    })
})

 adminRouter.post("/signin",async function(req,res){
   const {email,password} =req.body;
//TODO: idelly password should be hashed, and hence u cannot compare user provided password and the database paswwrd
    const admin= await adminModel.findOne({
        email:email,
        password:password
    });
    if(admin){
        const token=jwt.sign({
            id:admin._id // stored in mongo
        },JWT_ADMIN_PASSWORD);

        // Do cookie logic later
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
})
// /api/v1/course/course
adminRouter.post("/course",adminMiddleware ,async function(req,res){
    const adminId=req.userId;
    //admin can create the course=userId

    const {title,description, imgUrl, price}=req.body;

    const course=await courseModel.create({
        title:title,
        description:description,
        imgUrl:imgUrl,
        price:price,
        createrId:adminId
    })
    res.json({
        message: "Course created",
        courseId:course._id

    })
})

adminRouter.put("/course",adminMiddleware,async function(req,res){
    //admin can change the course i.e price,name
     const adminId=req.userId;

    const {title,description, imgUrl, price,courseId}=req.body;

    const course= await courseModel.updateOne({
        _id:courseId,
        createrId:adminId
        },{
        title:title,
        description:description,
        imgUrl:imgUrl,
        price:price
      })
    res.json({
        message: "Course updated",
        courseId:course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    //admin can get course in bulk
   const adminId=req.userId;
   
    const courses= await courseModel.find({
        createrId:adminId
      });
    res.json({
        message: "Course updated",
        courses
    })
})

module.exports={
    adminRouter:adminRouter
}