import exp from "express";
import { ArticleModel } from "../models/articleModel.js";

export const publicApp = exp.Router();

// list all active articles (no login required)
publicApp.get("/articles", async (req, res) => {
  const articlesList = await ArticleModel.find({ isArticleActive: true });
  res
    .status(200)
    .json({ message: "All available Articles", payload: articlesList });
});

// read single active article (no login required)
publicApp.get("/article/:id", async (req, res) => {
  const article = await ArticleModel.findOne({
    _id: req.params.id,
    isArticleActive: true,
  }).populate("comment.user");

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({ message: "Article found", payload: article });
});
