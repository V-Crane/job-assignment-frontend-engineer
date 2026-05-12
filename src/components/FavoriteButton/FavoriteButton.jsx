import "./FavoriteButton.css";
import { useUser } from "../../contexts/UserContext";
import { favoriteAnArticle, unfavoriteAnArticle } from "../../api/api";
import { useHistory } from "react-router-dom";

export const FavoriteButton = ({ favoritesCount, favorited, slug, onUpdate }) => {
  const { user } = useUser();
  const history = useHistory();

  const iconClassName = favorited ? "ion-ios-heart" : "ion-ios-heart-outline";
  const buttonClassName = `favorite-button ${favorited ? "favorited" : ""}`;

  const onFavoriteClick = async () => {
    if (user) {
      try {
        let updatedArticle;
        if (favorited) {
          updatedArticle = await unfavoriteAnArticle(slug);
        } else {
          updatedArticle = await favoriteAnArticle(slug);
        }
        if (onUpdate) {
          onUpdate(updatedArticle.article);
        }
      } catch (e) {
        console.error("Failed to favorite/unfavorite article:", e);
      }
    } else {
      history.push("/login");
    }
  };

  return (
    <button className={buttonClassName} onClick={onFavoriteClick}>
      <i className={iconClassName} /> {favoritesCount}
    </button>
  );
};
