function RepoList({ repos }) {
  return (
    <div className="repo-list">
      <h3>Repositories (showing latest 5):</h3>
      {repos.map((repo) => (
        <div key={repo.id} className="repo-card">
          <h4>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </h4>
          <p>{repo.description || "No description"}</p>
          <p><strong>Latest Commit:</strong> {repo.latestCommit}</p>
        </div>
      ))}
    </div>
  );
}

export default RepoList;
