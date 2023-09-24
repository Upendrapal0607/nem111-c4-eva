// const express= require("express");
const express = require("express");
const { AdminAuth } = require("../middleware/auth.middleware");
const { ProductModel } = require("../Model/Product");
// const { ProductModel } = require("../Model/ProductModel");

const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  try {
    const { category, rating, gender, q, sortBy, page, limit } = req.query;
    //  for example  basic Url = "http://localhost:8080/movie?page=2&limit=2&sortBy=asc"

    const query = {}; // all query Object

    //  if title is in query
    if (category) {
      query.category = new RegExp(category, "i"); // Case-insensitive title search
    }
    if (gender) {
      query.gender = new RegExp(gender, "i"); // Case-insensitive title search
    }
    //  if rating is in query
    if (rating) {
      query.rating = parseFloat(rating);
    }

    //  if any query is in query it is special for title
    if (q) {
      query.$or = [
        { title: new RegExp(q, "i") },
        { gender: new RegExp(q, "i") },
      ];
    }

    //  sorting Object
    const sortOptions = {};

    //   sorting by id
    if (sortBy) {
      sortOptions["rating"] = sortBy == "asc" ? 1 : -1; // 1 for ascending, -1 for descending
    }

    const pageNumber = parseInt(page) || 1; // page come form query if not then by default 1
    const pageSize = parseInt(limit) || 10; // limit come form query if not then by default 10
    const totalproduct = await ProductModel.countDocuments(query); // it is use for count totle Movies
    const totalPages = Math.ceil(totalproduct / pageSize); // logic for find total page

    const data = await ProductModel.find(query)
      .sort(sortOptions)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.json({
      data, // current page Array of Movie list mens how many limit you give
      page: pageNumber, // current page
      totalPages, // total page
      totalResults: totalproduct, //  total number of movie persent in database
    });
  } catch (error) {
    res.status(404).send({ message: error });
  }
});
// AdminAuth
productRoute.post("/add", async (req, res) => {
  const addedProduct = req.body;
  // console.log(addedProduct);
  try {
    const addedPost = new ProductModel(addedProduct);
    // await ProductModel.insertMany(addedProduct)
    await addedPost.save();
    console.log(addedProduct);
    res.status(200).send({ message: "New product added successfully" });
  } catch (error) {
    res.status(200).send(error);
  }
});

productRoute.patch("/update/:productId", AdminAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    console.log({productId});
    console.log({Body:req.body});
   
    const Post = await ProductModel.findOne({ _id: productId });
    console.log("Note", Post);
    // if(req.body.userID!=Post.userID) res.status(200).send({message:"you are not AdminAuthorized"})
    await ProductModel.findByIdAndUpdate({ _id: productId }, req.body);
    res
      .status(200)
      .send({ message: `Product ${productId} updated successfully` });
  } catch (error) {
    res.status(404).send({ message: "errror" });
  }
});
productRoute.delete("/delete/:productId", AdminAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    

    await ProductModel.findByIdAndDelete({ _id: productId });
    res
      .status(200)
      .send({ message: `Product ${productId} deleted successfully` });
  } catch (error) {
    res.status(404).send({ message: "errror" });
  }
});

module.exports = {
  productRoute,
};
