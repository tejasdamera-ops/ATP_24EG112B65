import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../store/authStore";
import { useForm } from "react-hook-form";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
  commentsWrapper,
  commentCard,
  commentHeader,
  commentUserRow,
  avatar,
  commentUser,
  commentTime,
  commentText,
  commentActions,
  commentActionBtn,
  commentDeleteBtn,
  secondaryBtn,
} from "../styles/Common.js";
import { buildApiUrl } from "../config/api";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const authorId = article?.author?._id || article?.author;
  const isArticleOwner =
    user?.role === "AUTHOR" && String(authorId) === String(user?.id);

  const getCommentUserId = (commentObj) =>
    commentObj.user?._id || commentObj.user;

  const isCommentOwner = (commentObj) =>
    user?.role === "USER" &&
    String(getCommentUserId(commentObj)) === String(user?.id);

  useEffect(() => {
    const getArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        let endpoint = `/public-api/article/${id}`;
        const config = {};

        if (user?.role === "AUTHOR") {
          endpoint = `/author-api/article/${id}`;
          config.withCredentials = true;
        } else if (user?.role === "USER") {
          endpoint = `/user-api/article/${id}`;
          config.withCredentials = true;
        }

        const res = await axios.get(buildApiUrl(endpoint), config);
        setArticle(res.data.payload);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to load article"
        );
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id, user]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus
      ? "Restore this article?"
      : "Delete this article?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        buildApiUrl("/author-api/articles"),
        {
          articleId: article._id,
          isArticleActive: newStatus,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      navigate("/author-profile");
    } catch (err) {
      const msg = err.response?.data?.message;
      toast.error(msg || "Operation failed");
    }
  };

  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  const promptLoginToComment = () => {
    toast.error("Please login");
  };

  const addComment = async (commentObj) => {
    if (!user || user.role !== "USER") {
      promptLoginToComment();
      return;
    }

    const trimmedComment = commentObj.comment?.trim();
    if (!trimmedComment) return;

    try {
      const res = await axios.put(
        buildApiUrl("/user-api/articles"),
        { articleId: article._id, comment: trimmedComment },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setArticle(res.data.payload);
        reset({ comment: "" });
        toast.success("Comment added");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  const startEditComment = (commentObj) => {
    setEditingCommentId(commentObj._id);
    setEditCommentText(commentObj.comment);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };

  const saveEditComment = async (commentId) => {
    const trimmedComment = editCommentText.trim();
    if (!trimmedComment) return;

    try {
      const res = await axios.patch(
        buildApiUrl("/user-api/articles/comment"),
        {
          articleId: article._id,
          commentId,
          comment: trimmedComment,
        },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      cancelEditComment();
      toast.success("Comment updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update comment");
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const res = await axios.delete(buildApiUrl("/author-api/articles/comment"), {
        data: { articleId: article._id, commentId },
        withCredentials: true,
      });

      setArticle(res.data.payload);
      toast.success("Comment deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  if (loading)
    return (
      <p className={loadingClass + " text-center px-4"}>Loading article...</p>
    );

  if (error)
    return <p className={errorClass + " text-center px-4"}>{error}</p>;

  if (!article) return null;

  return (
    <div
      className={`${articlePageWrapper} px-4 sm:px-6 py-6 sm:py-10 max-w-4xl mx-auto`}
    >

      {/* Header */}
      <div className={`${articleHeader} space-y-3 sm:space-y-4`}>

        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase text-lg sm:text-2xl md:text-3xl`}>
          {article.title}
        </h1>

        <div className={`${articleAuthorRow} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm`}>
          <div className={authorInfo}>✍ {user?.role}</div>
          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={`${articleContent} text-sm sm:text-base leading-relaxed`}>
        {article.content}
      </div>

      {/* AUTHOR actions — only for article owner */}
      {isArticleOwner && (
        <div className={`${articleActions} flex flex-col sm:flex-row gap-3 mt-4`}>

          <button className={`${editBtn} w-full sm:w-auto`} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={`${deleteBtn} w-full sm:w-auto`} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>

        </div>
      )}

      {/* Comment form — logged-in users can post; guests see login prompt */}
      {article.isArticleActive && (
        <div className={`${articleActions} mt-4`}>
          <form
            onSubmit={
              user?.role === "USER"
                ? handleSubmit(addComment)
                : (e) => {
                    e.preventDefault();
                    promptLoginToComment();
                  }
            }
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              {...register("comment")}
              className={`${inputClass} text-sm sm:text-base`}
              placeholder="Write your comment here..."
            />

            <button
              type="submit"
              className="bg-amber-600 text-white px-5 py-2 rounded-2xl w-full sm:w-auto"
            >
              Add comment
            </button>
          </form>
        </div>
      )}

      {/* comments */}
      <div className={`${commentsWrapper} mt-6 sm:mt-8`}>

        {(!article.comment || article.comment.length === 0) && (
          <p className="text-[#a1a1a6] text-sm text-center">
            No comments yet
          </p>
        )}

        {article.comment?.map((commentObj) => {
          const name = commentObj.user?.email || "User";
          const firstLetter = name.charAt(0).toUpperCase();
          const isEditing = editingCommentId === commentObj._id;

          return (
            <div key={commentObj._id} className={`${commentCard} p-3 sm:p-4`}>

              <div className={commentHeader}>
                <div className={commentUserRow}>

                  <div className={`${avatar} w-8 h-8 sm:w-10 sm:h-10`}>
                    {firstLetter}
                  </div>

                  <div>
                    <p className={`${commentUser} text-sm sm:text-base`}>
                      {name}
                    </p>
                    <p className={`${commentTime} text-xs sm:text-sm`}>
                      {formatDate(commentObj.createdAt || article.updatedAt)}
                    </p>
                  </div>

                </div>
              </div>

              {isEditing ? (
                <div className="mt-2 flex flex-col gap-2">
                  <input
                    type="text"
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className={`${inputClass} text-sm sm:text-base`}
                  />
                  <div className={commentActions}>
                    <button
                      type="button"
                      className={commentActionBtn}
                      onClick={() => saveEditComment(commentObj._id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className={`${secondaryBtn} !px-3 !py-1 text-xs`}
                      onClick={cancelEditComment}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className={`${commentText} text-sm sm:text-base`}>
                  {commentObj.comment}
                </p>
              )}

              {!isEditing && (isCommentOwner(commentObj) || isArticleOwner) && (
                <div className={commentActions}>
                  {isCommentOwner(commentObj) && (
                    <button
                      type="button"
                      className={commentActionBtn}
                      onClick={() => startEditComment(commentObj)}
                    >
                      Edit
                    </button>
                  )}
                  {isArticleOwner && (
                    <button
                      type="button"
                      className={commentDeleteBtn}
                      onClick={() => deleteComment(commentObj._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={`${articleFooter} text-xs sm:text-sm mt-6`}>
        Last updated: {formatDate(article.updatedAt)}
      </div>

    </div>
  );
}

export default ArticleByID;