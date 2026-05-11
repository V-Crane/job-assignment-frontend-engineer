import { AuthorIcon } from "../AuthorIcon/AuthorIcon";
import { Link } from "react-router-dom";
import { articleDateFormatter } from "../../services/services";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import './Articles.css'

export const Articles = ({ articles, updateArticle }) => {
  return articles.map(article => {
    const {
      author: { username, image },
      createdAt,
      favoritesCount,
      favorited,
      slug,
      title,
      description,
    } = article;

    return (
      <div className="article-preview" key={slug}>
        <div className="article-meta">
          <AuthorIcon image={image} username={username} />
          <div className="info">
            <Link to={`/profile/${username}`} className="author">
              {username}
            </Link>
            <span className="date">{articleDateFormatter(createdAt)}</span>
          </div>
          <FavoriteButton favoritesCount={favoritesCount} favorited={favorited} slug={slug} onUpdate={updateArticle} />
        </div>
        <Link to={`/${slug}`} className="preview-link">
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Read more...</span>
        </Link>
      </div>
    );
  });
};
