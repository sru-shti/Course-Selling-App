const {Router} =require("express");
const courseRouter = Router();

    courseRouter.post("/course/purchase_course",function(req,res){
    //u would exspect the user to pau u for courses
    res.json({
        message: "signup endpoint"
    })
})

courseRouter.get("/course/preview",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports={
    courseRouter:courseRouter
}