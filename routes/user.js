const {Router} =require("express");
const{userModel} =require("../db");
const jwt=require("jsonwebtoken")
const { JWT_USER_PASSWORD }=require("../config.js");
const userRouter = Router();

 userRouter.post("/signup",async function(req,res){
const {email,password,firstName,lastName} = req.body; //instead can use ( email=req.body.email)
// YODO :adding zod validation
// TODO :hash the password so plaintext pw not stored in db

    await userModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })

    res.json({
        message: "signup succeeded"
    })
})

 userRouter.post("/signin",async function(req,res){
    const {email,password} =req.body;
//TODO: idelly password should be hashed, and hence u cannot compare user provided password and the database paswwrd
    const user= await userModel.findOne({
        email:email,
        password:password
    });
    if(user){
        jwt.sign({
            id:user._id // stored in mongo
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

 userRouter.get("/purchases",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})
module.exports={
     userRouter:  userRouter
}