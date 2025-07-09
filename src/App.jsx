import React, {useState} from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import "./style.css";
import RepoList from "./components/RepoList";
import SearchBar from "./components/SearchBar";
import UserProfile from "./components/UserProfile";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserdata] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = async (name) => {
    try {
      setUsername(name);
      const userResponse = await axios.get('https://api.github.com/users/${name}');
      const userJson = userResponse.data;

      const repoResponse = await axios.get('https://api.github.com/users/${name}/repos');
      const repoJson = repoResponse.data;
      
      setUserdata(userJson);
      setRepos(repoJson);
      }

    catch (err) {
      console.error("Error getting github data:", err);
      setUserdata(null);
      setRepos([]);
    }
  };

  return (
    <div className="app">
      <h1 className="title">GitHub User Search! 📝</h1>
      <SearchBar onSearch={handleSearch} />
      {userData && <UserProfile user={userData} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
