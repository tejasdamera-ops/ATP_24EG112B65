import exp from "express";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
import { productApp } from "./APIs/productAPIs.js";
// //import cookieParser from "cookie-parser";
// const app = exp();
// app.use(exp.json());
// // app.use(cookieParser());


//forward req to Userapp if path start with /user-api
app.use("/user-api", userApp);
app.use("/product-api", productApp);



//first database connection shd happen then http req
async function connectDb() {
  try {
    await connect("mongodb://localhost:27017/userdb");
    console.log("DB cconnection server success");

    app.listen(4000, () => console.log("server started in port 4000"));
  } catch (error) {
    console.log("err in database connection", error);
  }
}
connectDb();

//global error handling middleware
//does not specify which error so we can will handle it better
// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: "Error occurred",
//     error: err.message,
//   });
// });
//error handling middleware
app.use((err,req,res,next)=>{
    // res.json({message:"error occured",error:err.message})
    console.log(err.name)
    //Validation error
    if(err.name=='ValidationError'){
        return res.status(400).json({message:"Error occured",error:err.message});
    }
    //Cast error
    if(err.name=='CastError'){
        return res.status(400).json({message:"Error occured",error:err.message});
    }
    //send server side errors
    res.status(500).json({message:"error occured",error:server.message})
})


