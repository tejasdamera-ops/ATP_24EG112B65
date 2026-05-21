import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
  pageTitleClass,
  pageWrapper,
} from "../styles/Common.js";
import { buildApiUrl } from "../config/api";

function Articles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(buildApiUrl("/public-api/articles"));
        if (res.status === 200) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to load articles"
        );
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const openArticle = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div className={`${pageWrapper} w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10`}>
      <h1 className={`${pageTitleClass} text-2xl sm:text-3xl mb-6 sm:mb-8`}>
        Explore Articles
      </h1>

      {error && <p className={errorClass}>{error}</p>}

      {articles.length === 0 ? (
        <p className="text-[#a1a1a6] text-sm text-center py-8 sm:py-10">
          No articles available yet
        </p>
      ) : (
        <div className={`${articleGrid} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`}>
          {articles.map((articleObj) => (
            <div className={articleCardClass} key={articleObj._id}>
              <div className="flex flex-col h-full">
                <div>
                  <p className={`${articleTitle} text-sm sm:text-base`}>
                    {articleObj.title}
                  </p>
                  <p className="text-xs sm:text-sm text-[#6e6e73] mt-1">
                    {articleObj.content.slice(0, 80)}...
                  </p>
                  <p className={`${timestampClass} mt-2 text-xs sm:text-sm`}>
                    {formatDateIST(articleObj.createdAt)}
                  </p>
                </div>
                <button
                  className={`${ghostBtn} mt-auto pt-3 sm:pt-4 text-sm sm:text-base`}
                  onClick={() => openArticle(articleObj)}
                >
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Articles;
