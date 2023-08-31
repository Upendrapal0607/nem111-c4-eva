const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    name :String,
    image :String,
    device: {
        type: String,
        enum: ["Laptop", "Mobile", "Tablet"]
      },
      price:Number,
    rating: Number,
    userID:String,
     user:String
  
})
const PostModel=mongoose.model("productData",postSchema);
module.exports={
    PostModel
}