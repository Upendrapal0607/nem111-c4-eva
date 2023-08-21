const mongoose=require("mongoose");

// {"title" :"apple",
// "body" : "branded phone,"
// "device": "Phone",
// "no_of_comments": 25
// }
// Laptop|Tablet|Mobile
const postSchema=mongoose.Schema({
    title :String,
    body :String,
    device: {
        type: String,
        enum: ["Laptop", "Mobile", "Tablet"]
      },
    no_of_comments: Number,
    userID:String,
     user:String
  
})
const PostModel=mongoose.model("postsData",postSchema);
module.exports={
    PostModel
}