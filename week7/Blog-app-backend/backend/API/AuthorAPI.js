import exp from "express";
export const authorApp = exp.Router();

import { UserModel } from "../models/userModel.js";
import { ArticleModel } from "../models/articleModel.js";
import { verifyToken } from "../middleware/verifyToken.js";

//to post an article, the user must be an author, so we will verify the token and check the role of the user
authorApp.post("/article", verifyToken("AUTHOR"), async (req, res) => {
  let articleObj = req.user;
  //check author
  let author2 = await UserModel.findById(articleObj.author);
  if (author2.email != user.email) {
    return res.status(403).json({ message: "You are not authorized " });
  }
  let author = UserModel.findById(articleObj.author);
  if (!author) {
    res.status(404).json({ message: "no user found" });
  }
  if (author.role !== "AUTHOR") {
    return res
      .status(403)
      .json({ message: "only author can publish articles" });
  }

  //create article document and save
  const articleDoc = new ArticleModel(articleObj);
  //save
  await articleDoc.save();
  //send res
  res.status(200).json({ message: "Article created" });
});

// read own articles
authorApp.get("/articles", verifyToken("AUTHOR"), async (req, res) => {
  // get the token
  const { id, email, role } = req.user;

  // list of areticle published by him
  const articlesList = await ArticleModel.find({ author: id });
  res.json({ message: "Ur articles", payload: articlesList });
});

// Edit article
authorApp.put("/articles", verifyToken("AUTHOR"), async (req, res) => {
  const id = req.user?.id;
  // get req body
  let { articleId, title, category, content } = req.body;
  // find article
  let article = await ArticleModel.findOneAndUpdate(
    { _id: articleId, author: id },
    { $set: { title, category, content } },
    { new: true },
  );
  if (!article) {
    return res
      .status(403)
      .json({ message: "you are unauthorized to edit this article..." });
  }
  res.status(200).json({ message: "Ur article is modified", payload: article });
});

// authorApp.delete('/articles',verifyToken("AUTHOR"),async(req,res)=>{
// const{articleId,isArticleActive} = req.body;
// const aritcleOfDB=await
// })
