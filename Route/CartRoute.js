const express= require("express");
const { auth } = require("../middleware/auth.middleware");
const { CartProductModel } = require("../Model/CartModel");

const CartRoute= express.Router();
CartRoute.use(auth)


CartRoute.get("/",async(req,res)=>{
  // console.log({body:req.body})
    try {
        const CartData= await CartProductModel.find({userId:req.body.userId});
      // console.log({CartData})
        res.send({CartData})
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})
CartRoute.post("/add",async(req,res)=>{
    const data = req.body;
    // console.log({data});
    try {
     const CreatedData= new CartProductModel(data)
     await CreatedData.save()
      res.status(200).send({message:"product added into the cart"})
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})

CartRoute.patch("/update/:paramId",async(req,res)=>{
  const {paramId} = req.params
  console.log(paramId)
  console.log({body:req.body})
  try {
    const checkProduct= await CartProductModel.findOne({_id:paramId})
    if(checkProduct){
  
      if(checkProduct.userId==req.body.userId){
        await CartProductModel.findByIdAndUpdate({_id:paramId},req.body)
        res.status(200).send({msg:`product id ${paramId} has been updated`})
      }else{
          res.status(200).send({msg:`you are not authorized`}) 
      }
    }else{
      res.status(200).send({msg:"product is not found"})
    }
  
  } catch (error) {
      res.status(400).send({error:"error"})
  }
})


CartRoute.delete("/delete/:paramId",async(req,res)=>{
    const {paramId} = req.params
    try {
      const checkProduct= await CartProductModel.findOne({_id:paramId})
      if(checkProduct){
    
        if(checkProduct.userId==req.body.userId){
          await CartProductModel.findByIdAndDelete({_id:paramId})
          res.status(200).send({msg:`product id ${paramId} has been deleted`})
        }else{
            res.status(200).send({msg:`you are not authorized`}) 
        }
      }else{
        res.status(200).send({msg:"product is not found"})
      }
    
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})

module.exports={
  CartRoute
}