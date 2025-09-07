const jwt=require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD }=require("../config.js");

function adminMiddleware(req,res,next){
    const token=res.headers.token;
    const decoded=jwt.verify(token,JWT_ADMIN_PASSWORD);

    if(decoded){
        req.userId=decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"you are not signed in"
        })
    }
}

module.exports={
    adminMiddleware:adminMiddleware
}