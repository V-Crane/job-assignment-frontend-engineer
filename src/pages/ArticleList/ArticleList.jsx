import "./ArticleList.css";
import { useCallback, useEffect, useState } from "react";
import { getArticles } from "../../api/api";
import { Link } from "react-router-dom";
import { AuthorIcon } from "../../components/AuthorIcon/AuthorIcon";
import { FavoriteButton } from "../../components/FavoriteButton/FavoriteButton";
import { articleDateFormatter } from "../../services/services";
import { Articles } from "../../components/Articles/Articles";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const loadArticles = useCallback(async () => {
    try {
      const loadedArticles = await getArticles();
      setArticles(loadedArticles.articles);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const updateArticle = updatedArticle => {
    setArticles(prevArticles =>
      prevArticles.map(article => (article.slug === updatedArticle.slug ? updatedArticle : article))
    );
  };

  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <Articles articles={articles} updateArticle={updateArticle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
