import exp from "express";
import { UserModel } from "../models/userModel.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export const commonApp = exp.Router();

// Register User
commonApp.post("/users", async (req, res, next) => {
  try {
    const allowedRoles = ["USER", "AUTHOR"];
    const newUser = req.body;

    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "invalid role" });
    }

    //check existing user
    const user = await UserModel.findOne({ email: newUser.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    newUser.password = await hash(newUser.password, 12);

    const newUserDoc = new UserModel(newUser);
    await newUserDoc.save();

    res.status(201).json({ message: "User Created" });
  } catch (err) {
    next(err);
  }
});

// Login User
commonApp.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      message: "Login successful",
      user: userObj,
    });
  } catch (err) {
    next(err);
  }
});

// Logout
commonApp.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logout successful" });
});

//change password

commonApp.put(
  "/password",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    //chx current password and new password
    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }
    //get id of ()
    const id = req.user._id;
    //get document of user from database
    const userDoc = await UserModel.findById(id);

    // get current password of ()
    const password = userDoc.password;
    //chx if currnt password of user and req and user are same
    if (!password === currentPassword) {
      return res.status().json({ message: "you entered the wrong password" });
    }
    //change password in database
    newPassword=hash(newPassword,12);
    //replace the currenet password
      userDoc.password=newPassword;
      await userDoc.save()
      //send res
      res.status(200).json({message:"Password changed successfully"})

  },
);
