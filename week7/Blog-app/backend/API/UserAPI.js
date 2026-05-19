// create mini applications
import exp from "express";
import { ArticleModel } from "../models/articleModel.js";
import { UserModel } from "../models/userModel.js";
import { verifyToken } from "../middleware/verifyToken.js";
export const userApp = exp.Router();

// read all article route
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  // get id of the user
  const userId = req.user?.id;
  // find user
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.isUserActive) {
    return res
      .status(400)
      .json({ message: "You are blocked from entering further pages" });
  }
  // read articles
  const articlesList = await ArticleModel.find({ isArticleActive: true });
  //send res
  res
    .status(200)
    .json({ message: "All available Articles", payload: articlesList });
});

// add a comment
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  // get req body
  const { articleId, comment } = req.body;
  // find the article

  const articleDoc = await ArticleModel.findOne({
    _id: articleId,
    isArticleActive: true,
  }).populate("comment.user");
  if (!articleDoc) {
    return res.status(404).json({ message: "Article not found" });
  }
  // find the user
  const userId = req.user?.id;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.isUserActive) {
    return res
      .status(400)
      .json({ message: "You are blocked from entering further pages" });
  }

  //add the comment
  articleDoc.comment.push({ user: userId, comment: comment });

  await articleDoc.save();
  // send res
  res.status(200).json({ message: "Comment added", payload: articleDoc });
});

// read single article
userApp.get("/article/:id", verifyToken("USER"), async (req, res) => {
  const userId = req.user?.id;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.isUserActive) {
    return res
      .status(400)
      .json({ message: "You are blocked from entering further pages" });
  }

  const article = await ArticleModel.findOne({
    _id: req.params.id,
    isArticleActive: true,
  }).populate("comment.user");

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({ message: "Article found", payload: article });
});

// edit own comment
userApp.patch("/articles/comment", verifyToken("USER"), async (req, res) => {
  const { articleId, commentId, comment } = req.body;
  const trimmedComment = comment?.trim();

  if (!articleId || !commentId || !trimmedComment) {
    return res.status(400).json({ message: "articleId, commentId, and comment are required" });
  }

  const userId = req.user?.id;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.isUserActive) {
    return res
      .status(400)
      .json({ message: "You are blocked from entering further pages" });
  }

  const articleDoc = await ArticleModel.findOne({
    _id: articleId,
    isArticleActive: true,
  });

  if (!articleDoc) {
    return res.status(404).json({ message: "Article not found" });
  }

  const commentDoc = articleDoc.comment.id(commentId);
  if (!commentDoc) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (commentDoc.user.toString() !== userId) {
    return res.status(403).json({ message: "You can only edit your own comments" });
  }

  commentDoc.comment = trimmedComment;
  await articleDoc.save();
  await articleDoc.populate("comment.user");

  res.status(200).json({ message: "Comment updated", payload: articleDoc });
});
