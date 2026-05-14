import { Schema, model } from "mongoose";
//Create user Schema(username,password,email,age)
const userSchema = new Schema(
  {
    //Structure of user resource
    username: {
      type: String,
      required: [true, "User name is required"],
      minLength: [4, "Min length of user namee is 4 characters"],
      maxLength: [6, "Max length of user name is 6 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already existed"],
    },
    age: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

//Generate UserModel
export const UserModel = model("User", userSchema);





// 1. First — What is Mongoose?

// Mongoose is a library for Node.js that helps us work with MongoDB easily.

// MongoDB stores data as documents (JSON-like objects).

// Example document in MongoDB:

// {
//   "username": "tejas",
//   "password": "1234",
//   "email": "tejas@mail.com",
//   "age": 20
// }

// But MongoDB does not force a structure.

// One document could be:

// { "name": "Rahul" }

// Another could be:

// { "username": "Rahul", "age": 20, "skills": ["js"] }

// This can become messy.

// So Mongoose solves this problem by letting us define a schema (structure).

// Think of it like:

// MongoDB = Database
// Mongoose = Tool to control how data is stored
// Schema = Structure / blueprint
// Model = Tool used to interact with the collection
// 2. First Line
// import { Schema, model } from "mongoose";
// What it does

// This imports Schema and model from mongoose.

// Item	Meaning
// Schema	Defines the structure of documents
// model	Creates a model to interact with MongoDB

// Simple meaning:

// Schema → defines structure
// Model → used to insert, update, delete, read data
// 3. Create Schema
// const userSchema = new Schema(

// This creates a schema object.

// Schema = blueprint of your data

// Example blueprint:

// User
//  ├ username
//  ├ password
//  ├ email
//  └ age





//  12. Create Model
// export const UserModel = model("User", userSchema);

// This is very important.

// model()

// Creates a Model from the schema.

// Syntax

// model("CollectionName", schema)
// What does Model do?

// Model allows us to interact with MongoDB.

// Using model we can:

// create users
// find users
// update users
// delete users
// Example

// Insert user

// UserModel.create({
//   username: "tejas",
//   password: "1234",
//   email: "tejas@mail.com",
//   age: 20
// })

// Find users

// UserModel.find()

// Delete user

// UserModel.deleteOne({username:"tejas"})
// 13. Why "User"?
// model("User", userSchema)

// MongoDB automatically creates collection:

// users

// Mongoose converts:

// User → users
// 14. Why Export?
// export const UserModel

// We export it so other files can use it.

// Example

// UserAPI.js
// import { UserModel } from "../models/userModel.js";

// Now we can do

// UserModel.create()
// UserModel.find()
// UserModel.updateOne()
// 15. Full Flow (Very Important)

// Step 1

// Create Schema

// Step 2

// Create Model

// Step 3

// Use Model to interact with DB

// Diagram:

// MongoDB Database
//         ↑
//      Mongoose
//         ↑
//      Schema
//         ↑
//       Model
//         ↑
//    API / Server
// 16. Simple Real-Life Analogy

// Think of School System

// Schema → Student form structure
// Model → Teacher who manages records
// MongoDB → School database

// Student form:

// Name
// Age
// Email

// Teacher (Model):

// Add student
// Update student
// Delete student

// Database stores it.