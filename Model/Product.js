const mongoose=require("mongoose");

const ProductSchema=mongoose.Schema({
  category:String,
  name: String,
  image:String,
  rating: Number,
  price: Number,
  details:String,
  gender:String
},{versionKey:false})
const ProductModel=mongoose.model("productData",ProductSchema);
module.exports={
  ProductModel
}