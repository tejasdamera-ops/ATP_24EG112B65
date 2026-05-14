//Create mini-exp app(seperate route)
import exp from "express";
// import { verifyToken } from "../middlewares/verify.js";
import { UserModel } from "../models/UserModel.js";
import { compare, hash } from "bcryptjs";
 import jwt from "jsonwebtoken";
const {sign}= jwt
//create a router
export const userApp = exp.Router();

//define user REST APIs route

//create new user

userApp.post("/users", async (req, res) => {
  //get new user obj from req
  const newUser = req.body;

   //hash the password
   const hashedpassword=await hash(newUser.password,10)
  //replce the password
    newUser.password=hashedpassword
   //create new user doc
   const newUserDocument = new UserModel(newUser);
  //save
  await newUserDocument.save();
   
  //send res
  res.status(201).json({ message: "User created" });
});

//read all users
userApp.get("/users", async (req, res) => {
  //read all users from db
  let userList = await UserModel.find();

  res.status(200).json({ message: "users", payload: userList });
});

// use findOne method to read a document with non object id fields
//use findByID method to read a document objecct id fields
userApp.get("/users/:id", async (req, res) => {
  // read uid from  req params

  const uid = req.params.id;
  //find by ID
  const userObj = await UserModel.findById(uid);
  //if user not found
  if (!userObj) return res.status(404).json({ message: "not found" });

  // send response
  res.status(200).json({ message: "users", payload: userObj });
});

userApp.put("/users/:id", async (req, res) => {
  //get modified user form req
  const modifiedUser = req.body;
  const uid = req.params.id;
  // find user by id
  const updatedUser = await UserModel.findByIdAndUpdate(
    uid,
    { $set: { ...modifiedUser } },
    { new: true, runValidators: true },
  );
  // show response
  // send response
  res.status(200).json({ message: "updated User", payload: updatedUser });
});

userApp.delete("/users/:id", async (req, res) => {
  //get uid
  const uid = req.params.id;
  // find by ID and delete the documetent
  let deletedUser = await UserModel.findByIdAndDelete(uid);
  if (!deletedUser) return res.status(404).json({ message: "user not found" });
  res.status(200).json({ message: "Deleted the user", deletedUser });
});



//login

userApp.post("/auth", async (req, res) => {
  //fetch details form req in destructed form
  const { email, password } = req.body;
  // verify email
  let user = await UserModel.findOne({ email: email });
  // if email not found
  if (!user) {
     return res.status(400).json({ message: "invalid email" });
  }
  // compare password
  let result = await compare(password, user.password);

  if(!result){
     return res.status(400).json({ message: "invalid password" });
  }
  //if password matched
  //create token 
   //if passwords are matched
  //create token (jsonwebtoken -jwt--jaat)
  const signedToken = sign({ email: user.email }, "abcdef", { expiresIn: "1h" });
  //store token as httpOnly cookie
  res.cookie("token",signedToken,{
    httpOnly:true,
    sameSite:"lax",
    secure:false
  })
  //send res
  res.status(200).json({message:"login success",payload:user})  
});
  

