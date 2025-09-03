const {Router} =require("express");
const adminRouter= Router();
const {adminModel} =require("../db");


 adminRouter.post("/signup",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

 adminRouter.post("/signin",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

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

adminRouter.get("/course",function(req,res){
    //admin can get course in bulk
    res.json({
        message: "admin can get course"
    })
})

module.exports={
    adminRouter:adminRouter
}