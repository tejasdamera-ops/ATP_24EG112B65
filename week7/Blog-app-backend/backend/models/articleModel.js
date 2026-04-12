import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "user",
    required: [true, "user id required"],
  },
  comment: {

    type: String,
    required:[true,'Enter a comment']
  },
});

const articleSchema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "Author ID is req"],
    },
    title: {
      type: String,
      required: [true, "Title is req"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    isArticleActive:{
      type:Boolean,
      default:true, 
    },
    comments: [{type:commentSchema,default:[]}]
  },
  {
    timestamps: false,
    versionKey: false,
    strict: "throw",
  },
);

export const ArticleModel = model("article", articleSchema);
