import exp from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { ArticleModel } from "../models/articleModel.js";
export const userApp = exp.Router();

// Get all articles of the authors
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  //read articles
  const articles = await ArticleModel.find({ isAritcleActive: true });
  //send res
  res.status(200).json({ messages: "article", payload: articles });
});

//add the comment
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  //get data
  const { articleID, comment } = req.body;
  //chx if article id exists
  const articleDocument = await find({ _id: articleID, isAritcleActive: true });
  if (!articleDocument) {
    return res.status(404).json({ message: "article not valid " });
  }
  //get user id
  const userID = req.user?._id;
  //add comment in article document
  articleDocument.comments.push({ userID: userID, comment: comment });
  await articleDocument.save();
  //send res
  res.status(200).json({ message: "comment added" });
});
