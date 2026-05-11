import React from "react";
import { Link } from "react-router-dom";

export const AuthorIcon = ({ image, username }) => {
  return (
    <Link to={`/profile/${username}`}>
      <img src={image || "http://i.imgur.com/Qr71crq.jpg"} alt={username} />
    </Link>
  );
};
