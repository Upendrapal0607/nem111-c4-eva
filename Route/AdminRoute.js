const express= require("express");
const { AdminModel } = require("../Model/AdminModel");
const jwt= require("jsonwebtoken");
const bcrypt=require("bcrypt")
const BlackList = require("../Model/BlackListModel");
const AdminRoute=express.Router();
AdminRoute.get("/",async(req,res)=>{
  try {
    const AllAdmin= await AdminModel.find()
    res.status(200).send(AllAdmin)
    
  } catch (error) {
    res.status(200).send({mess:error})
  }
  
})

AdminRoute.post("/register",async(req,res)=>{
   const resAdmin= req.body
   console.log(resAdmin);
   try {
    const AlraidyExitst= await AdminModel.findOne({email:resAdmin.email})
    if(AlraidyExitst){
        res.status(200).json({message:`Admin whose mail ${resAdmin.email} is alraiday resistered`,name:AlraidyExitst.name})
    }
    else{
    bcrypt.hash(resAdmin.password,5,async(err,hash)=>{
        if(err) res.status(404).send({message:err})
        const registerAdmin=new AdminModel({...resAdmin,password:hash})
        await registerAdmin.save()
        res.status(200).send({message:"new Admin resistered",name:registerAdmin.name})

    })
  }   
} catch (error) {
    res.status(404).send({message:error})
}
})
AdminRoute.post("/login",async(req,res)=>{
    const { email, password } = req.body;
    try {
      const Admin = await AdminModel.findOne({ email});
      // console.log("Admin-->",Admin);
      if (Admin) {
        bcrypt.compare(password, Admin.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              { AdminID: Admin._id, Admin: Admin.name },
              "admin",
              { expiresIn: "7d"}
            );
            console.log("Token-->",token);
            res.status(200).send({ message:"login successful",token:token});
          } else {
            res.status(200).send({ message: "wrong password or email" });
          }
        });
      } else {
        res.status(200).send({ message: "please provid email and password" });
      }
    } catch (error) {
      res.status(200).send({ message: error });
    }
})

AdminRoute.get("/logout",async(req,res)=>{
    try {
        const token=req.headers.authorization
        console.log("BK Token",token)
   const blacklist= new BlackList({token})
   await blacklist.save()
   res.status(200).send({message:"loguot successful"})

    } catch (error) {
        res.status(404).send({message:error})
        
    }
})
module.exports={
    AdminRoute
}

