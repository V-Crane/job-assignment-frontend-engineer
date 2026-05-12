import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getArticles, getProfile } from "../../api/api";
import { FollowAuthor } from "../../components/FollowAuthor/FollowAuthor";
import { Articles } from "../../components/Articles/Articles";
import "./Profile.css";

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [profileArticles, setProfileArticles] = useState(null);
  const { username } = useParams();

  const loadProfile = useCallback(async () => {
    try {
      const response = await getProfile(username);
      setProfile(response.profile);
    } catch (e) {
      console.log(e);
    }
  }, [username]);

  const loadArticlesForProfile = useCallback(async () => {
    try {
      const loadedArticles = await getArticles(`author=${username}`);
      setProfileArticles(loadedArticles.articles);
    } catch (e) {
      console.log(e);
    }
  }, [username]);

  useEffect(() => {
    loadProfile();
    loadArticlesForProfile();
  }, [loadArticlesForProfile, loadProfile]);

  const updateArticle = updatedArticle => {
    setProfileArticles(prevArticles =>
      prevArticles.map(article => (article.slug === updatedArticle.slug ? updatedArticle : article))
    );
  };

  const updateProfile = updatedProfile => {
    setProfile(updatedProfile);
  };

  if (!profile) {
    return null;
  }

  const { image, bio, following } = profile;

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container page">
          <div className="row">
            <div className="col-xs-12 col-md-9 mx-auto">
              <img src={image || "http://i.imgur.com/Qr71crq.jpg"} className="user-img" alt={username} />
              <h4>{username}</h4>
              <p>{bio}</p>
              <FollowAuthor username={username} following={following} onUpdate={updateProfile} />
            </div>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-xs-12 col-md-9 mx-auto">
            {profileArticles && profileArticles.length > 0 ? (
              <Articles articles={profileArticles} onUpdate={updateArticle} />
            ) : (
              <div className="article-preview">No articles are here... yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
