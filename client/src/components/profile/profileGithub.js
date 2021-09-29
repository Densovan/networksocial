import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileGithub = ({ username }) => {
  const [state, setState] = useState({
    clientId: "26c196bacea7db10cf48",
    clientSecret: "0885cb690e07d2a93a6afb0891fb552fd9f7aa53",
    count: 5,
    sort: "created: asc",
    repos: [],
  });
  const { count, sort, clientId, clientSecret } = state;

  useEffect(() => {
    axios
      // .get(`https://api.github.com/users/${username}`)
      .get(
        `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
      )
      .then((res) => {
        setState({ repos: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  const { repos } = state;
  const repoItems = repos.map((repo) => (
    <div key={repo.id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <a href={repo.html_url} className="text-info" target="_blank">
              {repo.name}
            </a>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">Forks: {repo.forks_count}</span>
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  );
};

export default ProfileGithub;

// import React from "react";

// const ProfileGithub = () => {
//   return (
//     <div>
//       <h1>hello</h1>
//     </div>
//   );
// };

// export default ProfileGithub;
