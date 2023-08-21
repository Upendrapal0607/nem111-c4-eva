// const express= require("express");
const express=require("express")
const { auth } = require("../middleware/auth.middleware");
const { PostModel } = require("../Model/PostModel");

const postRoute=express.Router();

postRoute.get("/",auth, async (req, res) => {

    try {
      allPost=await PostModel.find({userID:req.body.userID}).limit(3)
      res.status(200).send(allPost);
    } catch (error) {
      res.status(200).send({message:"your post not found"});
    }
  });
postRoute.get("/top",auth, async (req, res) => {
    try {
      const allpost= await PostModel.find()
      if(allpost.length>3){
        const TopPost = await PostModel.find({$sort:{no_of_comments:1}}).skip(allpost.length-3)
        res.status(200).send(TopPost);
      }else{
        res.status(200).send({message:"your post not found add any post"});
      }
    } catch (error) {
      res.status(200).send({message:"your post not found"});
    }
  });

  postRoute.post("/add", auth, async (req, res) => {
    const userPost = req.body;
    try {
      const addedPost = PostModel(userPost);
      await addedPost.save();
      console.log(userPost);
      res.status(200).send({ message: "new post added successfully" });
    } catch (error) {
      res.status(200).send(error);
    }
  });
  
  postRoute.patch("/update/:postId", auth, async (req, res) => {
    try {
      const { postId } = req.params;
     
      const Post = await PostModel.findOne({ _id: postId });
      console.log("Note", Post);
      if(req.body.userID!=Post.userID) res.status(200).send({message:"you are not authorized"})
        await PostModel.findByIdAndUpdate({ _id: postId }, req.body);
        res.status(200).send({ message: "post updated successfully" });
      
    } catch (error) {
      res.status(404).send({ message: "errror" });
    }
  });
  postRoute.delete("/delete/:postId", auth, async (req, res) => {
    try {
      const { postId } = req.params;
  
      const Post = await PostModel.findOne({ _id: postId });
      console.log(req.body.userID, Post._id);
      if(req.body.userID!=Post.userID){
        res.status(200).send({message:"you are not authorized"})
      }

        await PostModel.findByIdAndDelete({ _id: postId });
        res.status(200).send({ message: "post deleted successfully" });

    } catch (error) {
      res.status(404).send({ message: "errror" });
    }
  });


  module.exports={
    postRoute
}