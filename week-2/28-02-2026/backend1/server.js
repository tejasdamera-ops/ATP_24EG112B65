//Create HTTP server

import exp from "express";
const app = exp();


import {userApp} from "./APIs/UserAPIs.js";
import { ProductApp } from "./APIs/productAPIs.js";

//use a body parser middleware
app.use(exp.json());





app.use('/user-api',userApp);
app.use('/product-api', ProductApp);
//set a port number
const port = 3000;
//assign port number to http server

app.listen(port, () => console.log(`server listening po port ${port}`));

// create API( Representational State Transfer)

// dummay data

// Route to handle GET request of client(https://localhost:3000/users)
// app.get("/users",(req,res)=>{
//     //send response to client
//     res.json({message:"This respone for get users req "})
// })
// //Route to handle POST request of client
// app.post("/users",(req,res)=>{
//      res.json({message:"This respone for get post users"})
// })
// //Route to handle PUT request of client
// app.put("/users",(req,res)=>{
//      res.json({message:"This respone for get upadate users "})
// })
// //Route to handle DELETE request of client
// app.delete("/users",(req,res)=>{
//      res.json({message:"This respone for delete users"})
// })

//test data
// let users = [];

// app.get("/users", (req, res) => {
//   //send response to client
//   res.json({ message: "all users", payload: users });
// });



// //Route to handle POST request of client
// app.post("/users", (req, res) => {
//   //get new user form client
//   let newUser = req.body;
//   //push  user into users
//   users.push(newUser);
//   // send res
//   res.json({ message: "user created" });
// });




// // //Route to handle PUT request of client
// app.put("/users", (req, res) => {
//   //get modified user from client{}
//   let modifiedUser = req.body;
//   //find index of user
//   let index = users.findIndex((userObj) => {
//     return userObj.id === modifiedUser.id;
//   });
//   if (index == -1) {
//     return res.json({ message: "user not found" });
//   }
//   //update using splice
//   users.splice(index, 1, modifiedUser);

//   res.json({ message: "user modified" });
// });




// // //Route to handle DELETE request of client
// app.delete("/users/:id", (req, res) => {
//   //get id from URL parameter
//   let idOfUrl = Number(req.params.id);
//   //find index in the exisisting array
//   let index = users.findIndex((userObj) => {
//     return userObj.id === idOfUrl;
//   });
//   if(index==-1){
//      return res.json({message:"index not found"})
//   }
//   //delete the index
//   users.splice(index, 1);
//   res.json({message:" user deleted"})
// });






// 🧱 STEP 1: Generate package.json
// 👉 Command:
// npm init -y
// What is this doing?

// npm → Node Package Manager

// init → initialize a new Node project

// -y → say “yes” to all default settings

// What is package.json?

// It’s like your project’s ID card 📄
// It stores:

// Project name

// Version

// Dependencies (like express)

// Scripts

// Without this file, npm doesn’t know how to manage your project.

// 🌐 STEP 2: Create HTTP Server

// Now we create something that can:

// ✔ Listen to requests
// ✔ Send responses
// ✔ Work like a backend

// 🔹 Install Express
// Command:
// npm install express
// What happens?

// It downloads the Express framework

// Creates a node_modules folder

// Adds express to package.json dependencies

// 🔹 Import Express
// import exp from "express";

// This means:

// 👉 “Hey Node, bring the express module into this file.”

// But ⚠ IMPORTANT:
// For import to work, you must add this in package.json:

// "type": "module"



// const app = exp();

// What’s happening?

// exp() runs the express function

// It creates an app object

// This app is your server

// Think of app as your backend machine 🖥

// 🔹 Set Port Number
// const port = 3000;

// A port is like a door number 🚪

// Your computer has many doors (ports).
// You’re telling your server:

// 👉 “Use door number 3000”

// 🔹 Start Listening
// app.listen(port, () =>
//   console.log(`server listening on port ${port}`)
// );

// This means:

// app.listen() → Start the server

// port → Listen on 3000

// () => console.log() → Run this when server starts

// So when you run:

// node server.js

// You’ll see:

// server listening on port 3000

// Now your backend is LIVE 🚀

// 🔁 What Actually Happens Internally?

// Node runs your file

// Express creates a server

// Server listens on port 3000

// When someone visits:

// http://localhost:3000
// Your server will respond (if you define routes)

// 2️⃣ Understanding This Line

// app.get("/users", (req, res) => {

// Here:

// app → Your Express application

// get → HTTP method

// "/users" → Route (URL path)

// (req, res) → Callback function

// req = request (data coming from client)
// res = response (what you send back)

// 3️⃣ GET Request

// app.get("/users", (req, res) => {
// res.json({message:"This response for get users req"})
// })

// What happens here?

// If someone goes to:
// https://localhost:3000/users

// Using GET method…

// The server sends back JSON:

// {
// "message": "This response for get users req"
// }

// In real projects:
// GET /users → returns list of users from database

// Example real use case:
// You open Instagram → it fetches your followers list → that’s GET.

// 4️⃣ POST Request

// app.post("/users", (req, res) => {
// res.json({message:"This response for get post users"})
// })

// POST is used to CREATE new data.

// Example:
// You fill a signup form → click submit → that’s POST.

// In real case:
// POST /users
// → creates a new user in database

// Right now you’re just sending a dummy message.

// 5️⃣ PUT Request

// app.put("/users", (req, res) => {
// res.json({message:"This response for get update users"})
// })

// PUT is used to UPDATE data.

// Example:
// You change your username → that’s PUT.

// Real example:
// PUT /users/1
// → updates user with ID 1

// 6️⃣ DELETE Request

// app.delete("/users", (req, res) => {
// res.json({message:"This response for delete users"})
// })

// DELETE removes data.

// Example:
// You delete your account → that’s DELETE.

// Real example:
// DELETE /users/1
// → deletes user with ID 1




































