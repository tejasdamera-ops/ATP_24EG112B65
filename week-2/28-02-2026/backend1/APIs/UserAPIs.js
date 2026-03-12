import exp from 'express'
export const userApp=exp.Router()




let users = [];

userApp.get("/users", (req, res) => {
  //send response to client
  res.json({ message: "all users", payload: users });
});



//Route to handle POST request of client
userApp.post("/users", (req, res) => {
  //get new user form client
  let newUser = req.body;
  //push  user into users
  users.push(newUser);
  // send res
  res.json({ message: "user created" });
});




// //Route to handle PUT request of client
userApp.put("/users", (req, res) => {
  //get modified user from client{}
  let modifiedUser = req.body;
  //find index of user
  let index = users.findIndex((userObj) => {
    return userObj.id === modifiedUser.id;
  });
  if (index == -1) {
    return res.json({ message: "user not found" });
  }
  //update using splice
  users.splice(index, 1, modifiedUser);

  res.json({ message: "user modified" });
});




// //Route to handle DELETE request of client
userApp.delete("/users/:id", (req, res) => {
  //get id from URL parameter
  let idOfUrl = Number(req.params.id);
  //find index in the exisisting array
  let index = users.findIndex((userObj) => {
    return userObj.id === idOfUrl;
  });
  if(index==-1){
     return res.json({message:"index not found"})
  }
  //delete the index
  users.splice(index, 1);
  res.json({message:" user deleted"})
});







