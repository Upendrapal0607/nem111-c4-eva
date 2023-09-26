const express= require("express");
const { auth } = require("../middleware/auth.middleware");
const { CartProductModel } = require("../Model/CartModel");

const CartRoute= express.Router();
CartRoute.use(auth)
module.exports={
    CartRoute
}

CartRoute.get("/",async(req,res)=>{
    console.log({req:req.body});
    try {
        const AllCartData= await CartProductModel.find({userId:req.body.userId});
        res.send({AllCartData})
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})
CartRoute.post("/add",async(req,res)=>{
    const data = req.body;
    try {
     const CreatedData= new CartProductModel(data)
     await CreatedData.save()
      res.status(200).send({mag:"product added into the cart"})
    } catch (error) {
        res.status(400).send({error:"error"})
    }
})
CartRoute.delete("/delete/:userId",async(req,res)=>{
    const {userId} = req.params
    try {
      const checkNote= await CartProductModel.findOne({_id:userId})
      if(checkNote){
    
        if(checkNote.userId==req.body.userId){
          await CartProductModel.findByIdAndDelete({_id:userId})
          res.status(200).send({msg:`note id ${userId} has been deleted`})
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