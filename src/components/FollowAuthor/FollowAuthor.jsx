import { useUser } from "../../contexts/UserContext";
import { followAuthor, unfollowAuthor } from "../../api/api";
import { useHistory } from "react-router-dom";
import './FollowAuthor.css'

export const FollowAuthor = ({ username, following, onUpdate }) => {
  const { user } = useUser();
  const history = useHistory();

  const buttonClassNames = `follow-author-button btn btn-sm ${following ? "btn-secondary" : "btn-outline-secondary"}`;
  const iconClassNames = following ? "ion-minus-round" : "ion-plus-round";

  const onFollowClick = async () => {
    if (!user) {
      history.push("/login");
      return;
    }

    try {
      let updatedProfile;
      if (following) {
        updatedProfile = await unfollowAuthor(username);
      } else {
        updatedProfile = await followAuthor(username);
      }
      if (onUpdate) {
        onUpdate(updatedProfile.profile);
      }
    } catch (e) {
      console.error("Failed to follow/unfollow author:", e);
    }
  };

  return (
    <button className={buttonClassNames} onClick={onFollowClick}>
      <i className={iconClassNames} />
      {following ? "Unfollow" : "Follow"} {username}
    </button>
  );
};
