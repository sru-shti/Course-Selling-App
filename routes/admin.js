const {Router} =require("express");
const adminRouter= Router();
const {adminModel} =require("../db");
const jwt=require("jsonwebtoken");
// becrypt,zod ,jsonwebtoken for password auth

const JWT_ADMIN_PASSWORD ="ghj123"

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
        jwt.sign({
            id:admin._id // stored in mongo
        },JWT_USER_PASSWORD);

        // Do cookie logic later
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
    res.json({
        message: "signin succeeded"
    })
})
// /api/v1/course/course
adminRouter.post("/course",function(req,res){
    //admin can create the course
    res.json({
        message: " create the course"
    })
})

adminRouter.put("/course",function(req,res){
    //admin can change the course i.e price,name
    res.json({
        message: "change the course"
    })
})

adminRouter.get("/course/bulk",function(req,res){
    //admin can get course in bulk
    res.json({
        message: "admin can get course"
    })
})

module.exports={
    adminRouter:adminRouter
}