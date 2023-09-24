const mongoose= require("mongoose");

const AdminSchema=mongoose.Schema({
    name:String,
    email: String,
    gender:String,
    password:String,
    age:Number,
    city : String,
},{versionKey:false})
const AdminModel= mongoose.model("ResisterAdmin",AdminSchema)

module.exports={
    AdminModel
}
