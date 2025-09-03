const mongoose=require("mongoose");
console.log("connected to");
mongoose.connect("mongodb+srv://chobhesrushti:Mz9t9vMkkoHvvHd7@cluster0.hu82ya0.mongodb.net/coursera-app")
const Schema =mongoose.Schema;
const ObjectId= mongoose.Types.ObjectId;

const userSchema=new Schema({
    email:{ type:String, unique: true},
    password:String,
    firstName: String,
    lastName: String,
});

const adminSchema=new Schema({
    email:{ type:String, unique: true},
    password:String,
    firstName: String,
    lastName: String
});

const courseSchema=new Schema({
    title:String,
    descreption: String,
    price: Number,
    imgUrl: String,
    createrId: ObjectId
});

const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId :ObjectId
});

const userModel =mongoose.model("user",userSchema);
const adminModel =mongoose.model("admin", adminSchema);
const courseModel =mongoose.model("course",courseSchema);
const purchaseModel =mongoose.model("purchase",purchaseSchema );   

module.export={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}