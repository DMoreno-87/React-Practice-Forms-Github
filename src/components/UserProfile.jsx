import React from "react";

const UserProfile = ({ user }) => {
    return (
        <div classname = "user-profile">
            <img src = {user.avatar_url} alt = "avatar" width = {100} />
            <h2>{user.name || user.login}</h2>
            <p>{user.bio}</p>
            <a href = {user.html_url} target = "_blank" rel = "nonreferrer">
                View Profile
            </a>
        </div>
    );
};

export default UserProfile;