import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import SearchForm from "./components/SearchForm";
import UserInfo from "./components/UserInfo";
import RepoList from "./components/RepoList";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async (username) => {
    setLoading(true);
    try {
      // Fetch user info
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(userRes.data);

      // Fetch repos
      const reposRes = await axios.get(userRes.data.repos_url);
      const topRepos = reposRes.data.slice(0, 5);

      // Fetch latest commit for each repo
      const reposWithCommits = await Promise.all(
        topRepos.map(async (repo) => {
          try {
            const commitsRes = await axios.get(
              `https://api.github.com/repos/${username}/${repo.name}/commits`
            );
            return {
              ...repo,
              latestCommit: commitsRes.data[0]?.commit?.message || "No commits",
            };
          } catch {
            return {
              ...repo,
              latestCommit: "Failed to fetch commits",
            };
          }
        })
      );

      setRepos(reposWithCommits);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
      setUserData(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>GitHub Profile Explorer</h1>
      <SearchForm onSearch={fetchGitHubData} />
      {loading && <p>Loading...</p>}
      {userData && <UserInfo user={userData} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
};

export default App;
