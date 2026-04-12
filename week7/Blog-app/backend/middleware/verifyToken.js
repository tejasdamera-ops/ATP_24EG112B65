import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
const {verify} = jwt
config() 
export const verifyToken = (...allowedrole)=>{ ////verifyToken("AUTHOR","ADMIN","USER")
    try {
    return (req,res,next)=>{
        //get Token from cookie
    const token = req.cookies?.token //{token:}
    //check token existed or not
    if(!token) {
        return res.status(401).json({message:"Please login first"})
    }
    //validate token(decode the token)
    let decodedToken = verify(token,process.env.SECRET_KEY) //It throws error if the decodedtoken is invalid
    //check the role is same as role in decoded token
        //  id: user._id,
        // email: user.email,
        // role: user.role,
   if(!allowedrole.includes(decodedToken.role)) {
    return res.status(403).json({message:"You are not authorised"})
   }
    //add decoded token
    req.user =decodedToken;
    next();
    }
}  catch(err) {
    return res.status(401).json({message:"Invalid token"})
}
}
//  verifyToken("AUTHOR","ADMIN","USER") //it returns a middleware function which will verify the token and check the role of the user





// export const verifyToken = async(req,res,next)=> {
//     try {
//     //get Token from cookie
//     const token = req.cookies?.token //{token:}
//     //check token existed or not
//     if(!token) {
//         return res.status(401).json({message:"Please login first"})
//     }
//     //validate token(decode the token)
//     let decodedToken = verify(token,process.env.SECRET_KEY) //It throws error if the decodedtoken is invalid
//     //check the role is same as role in decoded token

//     //add decoded token
//     req.user =decodedToken;
//     next();
// }catch(err) 
// {
//     res.status(401).json({message:"Invalid Token"})

// }
// }
























// I’ll explain this very slowly and beginner-friendly, because this code is the second half of JWT authentication.

// Earlier you learned:

// login → create token → store token in cookie

// Now we learn:

// read token → verify token → allow request

// This is called route protection.

// 1️⃣ What Is This Code Doing Overall?

// Your code is protecting the /users API.

// Meaning:

// Only logged-in users can access /users

// If someone is not logged in, they cannot access it.

// Flow:

// Client request
//       ↓
// verifyToken middleware
//       ↓
// if token valid → allow request
// if token invalid → reject request
// 2️⃣ Import JWT
// import jwt from "jsonwebtoken";
// const { verify } = jwt;
// What this does

// You import the jsonwebtoken library.

// This library helps with:

// create tokens
// verify tokens
// decode tokens

// Here you use:

// verify()

// Purpose of verify():

// check if token is valid
// 3️⃣ Middleware Function
// export function verifyToken(req, res, next)

// This is an Express middleware.

// Middleware means:

// a function that runs before the route handler

// Example flow:

// Request
//    ↓
// Middleware
//    ↓
// Route handler
//    ↓
// Response

// In your case:

// Request → verifyToken → /users API
// 4️⃣ First Step — Get Token From Cookie
// const token = req.cookies?.token;

// Remember earlier:

// res.cookie("token", signedToken)

// So the browser stored:

// token = eyJhbGciOiJIUzI1Ni...

// When the browser makes a request:

// GET /users

// The browser automatically sends:

// Cookie: token=eyJhbGciOiJIUzI1Ni...

// Express reads it here:

// req.cookies.token

// So this line gets the token stored in the cookie.

// The ?. means:

// optional chaining

// Meaning:

// if cookies exist → get token
// if not → return undefined
// 5️⃣ Check If Token Exists
// if (!token) {
//   return res.status(401).json({ message: "plz login" });
// }

// This checks:

// Did the user send a token?

// If not:

// user not logged in

// So we send error:

// 401 Unauthorized

// Response:

// {
//  "message": "plz login"
// }

// So only logged-in users can continue.

// 6️⃣ Verify the Token
// const decodedToken = verify(token, "abcdef");

// This is the most important line.

// What verify() does:

// 1 check token signature
// 2 check secret key
// 3 check expiry time

// Remember when creating token:

// sign({email:user.email},"abcdef",{expiresIn:"1h"})

// Now verify() checks:

// Is token signed using "abcdef" ?
// Has token expired?
// Has token been modified?

// If everything is correct:

// token is valid
// 7️⃣ Decoded Token
// console.log(decodedToken);

// When a token is verified, we can read its payload.

// Example payload stored earlier:

// { email: user.email }

// So decoded token becomes:

// {
//  email: "tejas@mail.com",
//  iat: 1710000000,
//  exp: 1710003600
// }

// Fields:

// Field	Meaning
// email	user identity
// iat	issued at time
// exp	expiry time
// 8️⃣ Allow Request
// next();

// next() means:

// continue to next function

// So Express now moves to the actual route:

// /users API

// Flow becomes:

// Request
//    ↓
// verifyToken middleware
//    ↓
// next()
//    ↓
// Route handler







// et's break this line very carefully and simply:

// const token = req.cookies?.token;

// To understand it, we must first understand 3 things:

// 1️⃣ What is req
// 2️⃣ What is req.cookies
// 3️⃣ What ?. means

// 1️⃣ What is req?

// In Express, every API gets two main objects:

// (req, res)

// Example:

// userApp.get("/users", (req, res) => {

// Here:

// Object	Meaning
// req	request sent by client
// res	response sent by server

// So req contains all information about the request.

// Example things inside req:

// req.body
// req.params
// req.query
// req.headers
// req.cookies

// Example request:

// GET /users
// Cookie: token=abc123

// All this request data is stored inside req.

// 2️⃣ What is req.cookies?

// Cookies come from the browser request.

// Example request sent by browser:

// GET /users
// Cookie: token=abc123

// Express reads this and converts it into an object:

// req.cookies = {
//   token: "abc123"
// }

// So:

// req.cookies.token → "abc123"

// This is how we get the token.

// But this only works if we use cookie-parser middleware.

// Example in server.js:

// import cookieParser from "cookie-parser";

// app.use(cookieParser());

// Without this middleware:

// req.cookies = undefined
// 3️⃣ What does ?. mean?

// This is called optional chaining.

// Syntax:

// object?.property

// Meaning:

// If object exists → access property
// If object does not exist → return undefined

// Example:

// req.cookies?.token

// Cases:

// Case 1 — Cookies exist
// req.cookies = { token: "abc123" }

// Then:

// req.cookies?.token → "abc123"
// Case 2 — Cookies do not exist
// req.cookies = undefined

// Then:

// req.cookies?.token → undefined

// Without ?., this would crash:

// req.cookies.token

// Error:

// Cannot read property 'token' of undefined

// So ?. prevents errors.

// 4️⃣ Full Flow (Very Important)
// Step 1 — Login

// Server creates token:

// const signedToken = sign(...);

// Server sends cookie:

// res.cookie("token", signedToken);

// Browser stores cookie:

// token = abc123
// Step 2 — Browser sends request

// User visits:

// GET /users

// Browser automatically sends:

// Cookie: token=abc123
// Step 3 — Express reads cookie

// With cookie-parser:

// req.cookies = {
//   token: "abc123"
// }
// Step 4 — Your code
// const token = req.cookies?.token;

// So:

// token = "abc123"
// 5️⃣ Simple Example

// Browser request:

// GET /users
// Cookie: token=xyz123

// Express receives:

// req.cookies = {
//   token: "xyz123"
// }

// Your code:

// const token = req.cookies?.token;

// Result:

// token = "xyz123"
// 6️⃣ Very Simple Way to Remember
// req.cookies → all cookies sent by browser
// req.cookies.token → specific cookie named token
// ?. → prevent crash if cookies don't exist
// 7️⃣ Visual Diagram
// Browser
//    │
//    │ Cookie: token=abc123
//    ▼
// Express Server
//    │
//    │ cookie-parser
//    ▼
// req.cookies = { token:"abc123" }
//    │
//    ▼
// req.cookies?.token
//    │
//    ▼
// token = "abc123"






















// Good question 👍
// req.user is used so that the next route can know which user is making the request.

// Let’s understand it step-by-step in a beginner-friendly way.

// 1️⃣ What is req?

// In Express every API receives two objects:

// (req, res)
// Object	Meaning
// req	request sent by client
// res	response sent by server

// req contains information about the request.

// Example things inside req:

// req.body
// req.params
// req.query
// req.cookies

// You can also add your own data to req.

// Example:

// req.user = something
// 2️⃣ What is decodedToken?

// When you verify a token:

// let decodedToken = verify(token, process.env.SECRET_KEY)

// You get the payload stored in the token.

// Example payload when token was created:

// sign({
//  id: user._id,
//  email: user.email,
//  role: user.role
// })

// So after verifying:

// decodedToken =
// {
//  id: "65789abc",
//  email: "tejas@mail.com",
//  role: "ADMIN",
//  iat: 171000000,
//  exp: 171000360
// }

// This contains user identity.

// 3️⃣ Why We Save It in req.user

// Your middleware does:

// req.user = decodedToken;

// This means:

// Attach logged-in user info to the request

// Now the next route can access the user.

// 4️⃣ Example Without req.user

// Route:

// userApp.get("/profile", verifyToken, (req,res)=>{
// })

// Inside this route:

// How do we know which user made the request?

// We don't know.

// Because the token verification happened in middleware.

// 5️⃣ Example With req.user

// Middleware:

// req.user = decodedToken

// Now route can access:

// req.user

// Example route:

// userApp.get("/profile", verifyToken, async (req,res)=>{

//  console.log(req.user)

// })

// Output:

// {
//  id: "65789abc",
//  email: "tejas@mail.com",
//  role: "ADMIN"
// }

// Now the route knows:

// who is logged in
// 6️⃣ Real Example

// Get current logged-in user's profile.

// userApp.get("/profile", verifyToken, async (req,res)=>{

//  const user = await UserModel.findById(req.user.id)

//  res.json(user)

// })

// Here:

// req.user.id → user id from token

// So we fetch the correct user.

// 7️⃣ Flow Diagram
// Client Request
//      │
//      ▼
// verifyToken middleware
//      │
//      │ decode JWT
//      ▼
// decodedToken
//      │
//      ▼
// req.user = decodedToken
//      │
//      ▼
// next()
//      │
//      ▼
// Route Handler
//      │
//      │ use req.user
//      ▼
// Send response
// 8️⃣ Simple Analogy

// Think of middleware like security check at airport.

// Security verifies your passport and then gives you a boarding pass.

// Passport = token
// Decoded token = identity
// req.user = boarding pass

// Now the airport gate (route handler) can read the boarding pass.

// 9️⃣ What req.user Usually Contains

// Typical JWT payload:

// req.user = {
//  id: "userId",
//  email: "user@mail.com",
//  role: "ADMIN"
// }

// Routes can use this for:

// getting profile
// checking permissions
// logging activity
// fetching user data
// 🔟 Simple Summary
// decodedToken → user info inside token

// req.user = decodedToken

// Purpose:

// Make logged-in user information available to the route

// So routes can know:

// who made the request