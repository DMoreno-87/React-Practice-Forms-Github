import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} width="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>Repos: {user.public_repos} | Followers: {user.followers}</p>
      <a href={user.html_url} target="_blank" rel="noreferrer">
        View Profile
      </a>
    </div>
  );
}

export default UserInfo;



