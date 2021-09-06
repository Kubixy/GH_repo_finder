import React, { useEffect, useState } from "react";
import { githubV4Api } from "../utils/api";
import { useLocation } from "react-router-dom";
import { Header } from "semantic-ui-react";

import RepoCard from "./RepoCard";

export default function CardList() {
  const [data, setData] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    githubV4Api(loc.pathname.substring(1))
      .then((data) => {
        setData(data.data.data.user.repositories.nodes);
      })
      .catch(() => {
        setErrorState(true);
      });
  }, []);

  return (
    <div>
      <div className="App--list">
        {errorState ? (
          <Header color="red" size="huge">
            User not found
          </Header>
        ) : (
          data.map((x, index) => {
            return <RepoCard key={index} info={x} />;
          })
        )}
      </div>
    </div>
  );
}
