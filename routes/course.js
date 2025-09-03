const {Router} =require("express");
const courseRouter = Router();

courseRouter.post("/purchase_course",function(req,res){
    //u would exspect the user to pau u for courses
    res.json({
        message: "signup endpoint"
    })
})

courseRouter.get("/preview",function(req,res){
    res.json({
        message: "course preview endpoint"
    })
})


module.exports={
    courseRouter:courseRouter
} 