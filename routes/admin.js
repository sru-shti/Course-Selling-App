const {Router} =require("express");
const adminRouter= Router();


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
        message: "signin endpoint"
    })
})

adminRouter.put("/course",function(req,res){
    //admin can change the course i.e price,name
    res.json({
        message: "signin endpoint"
    })
})

adminRouter.get("/course",function(req,res){
    //admin can get course in bulk
    res.json({
        message: "signin endpoint"
    })
})

MediaSourceHandle.exports={
    adminRouter:adminRouter
}