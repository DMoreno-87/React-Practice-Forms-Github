import { useState } from "react";
import SearchForm from "./components/SearchForm";
import UserInfo from "./components/UserInfo";
import RepoList from "./components/RepoList";

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async (username) => {
    setLoading(true);
    try {
      // Fetch user info
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");
      const user = await userRes.json();
      setUserData(user);

      // Fetch repos
      const reposRes = await fetch(user.repos_url);
      const reposData = await reposRes.json();

      // For each repo, fetch latest commit
      const reposWithCommits = await Promise.all(
        reposData.slice(0, 5).map(async (repo) => {
          const commitsRes = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits`
          );
          const commits = await commitsRes.json();
          return {
            ...repo,
            latestCommit: commits[0]?.commit?.message || "No commits",
          };
        })
      );

      setRepos(reposWithCommits);
    } catch (error) {
      alert(error.message);
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
}

export default App;
