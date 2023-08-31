const { connection } = require("./db");
const cors=require("cors")
const express=require("express");
const { userRoute } = require("./Route/UserRoute");
const { postRoute } = require("./Route/PostRoute");
// const { postRoute } = require("./Route/PosRoute");
const app= express();
app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use("/products",postRoute)
 app.listen(8080,async()=>{
   try {
    await connection
    console.log("server running on port 8080");
    console.log("connected to the database");

   } catch (error) {
    console.log(error)
   }
})