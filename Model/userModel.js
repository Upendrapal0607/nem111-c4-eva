const mongoose= require("mongoose");

// {
//     "name":"Upendra",
//     "email":"abc@gmail.com",
//     "gender":"male",
//     "password":"pal",
//     "age":22,
//     "city":"Prayagraj",
//     "is_married":false
// }
const userSchema=mongoose.Schema({
    name:String,
    email: String,
    gender:String,
    password : String,
    age:Number,
    city : String,
    is_married:Boolean
},{versionKey:false})
const UserModel= mongoose.model("post",userSchema)

module.exports={
    UserModel
}
