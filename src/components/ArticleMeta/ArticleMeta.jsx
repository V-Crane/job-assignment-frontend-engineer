import { articleDateFormatter } from "../../services/services";
import { AuthorIcon } from "../AuthorIcon/AuthorIcon";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { FollowAuthor } from "../FollowAuthor/FollowAuthor";

export const ArticleMeta = ({ author, createdAt, favoritesCount, favorited, slug, updateArticle, updateProfile }) => {
  return (
    <div className="article-meta">
      <AuthorIcon image={author.image} username={author.username} />
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{articleDateFormatter(createdAt)}</span>
      </div>
      <FollowAuthor onUpdate={updateProfile} username={author.username} following={author.following} />
      <FavoriteButton favoritesCount={favoritesCount} favorited={favorited} slug={slug} onUpdate={updateArticle} />
    </div>
  );
}