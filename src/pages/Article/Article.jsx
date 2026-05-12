import "./Article.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../../api/api";
import { ArticleMeta } from "../../components/ArticleMeta/ArticleMeta";

export default function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await getArticle(slug);
        setArticle(response.article);
      } catch (e) {
        console.error("Failed to load article", e);
      }
    };
    loadArticle();
  }, [slug]);

  if (!article) {
    return null;
  }

  const { title, description, body, createdAt, author, favorited, favoritesCount } = article;

  const updateArticle = updatedArticle => {
    setArticle(updatedArticle);
  };
  const updateProfile = updateProfile => {
    setArticle(prevState => ({ ...prevState, author: updateProfile }));
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <ArticleMeta
            author={author}
            createdAt={createdAt}
            favoritesCount={favoritesCount}
            favorited={favorited}
            slug={slug}
            updateArticle={updateArticle}
            updateProfile={updateProfile}
          />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{description}</p>
            <div>{body}</div>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta
            author={author}
            createdAt={createdAt}
            favoritesCount={favoritesCount}
            favorited={favorited}
            slug={slug}
            updateArticle={updateArticle}
            updateProfile={updateProfile}
          />
        </div>
      </div>
    </div>
  );
}
