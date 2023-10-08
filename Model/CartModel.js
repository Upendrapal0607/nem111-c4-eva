

const mongoose=require("mongoose");

const CartProductSchema=mongoose.Schema({
  category:String,
  name: String,
  image:String,
  rating: Number,
  price: Number,
  details:String,
  gender:String,
  userId:String,
  userName:String,
  productId:String,
  productCount:Number
},{versionKey:false})
const CartProductModel=mongoose.model("cartproductData",CartProductSchema);
module.exports={
  CartProductModel
}