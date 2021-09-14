import React, { useEffect, useState } from "react";
import { githubV4Api } from "../utils/api";
import { useLocation } from "react-router-dom";
import { Header, Table } from "semantic-ui-react";

import RepoCard from "./RepoCard";

export default function CardTable() {
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
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="App--list">
        {errorState ? (
          <Header color="red" size="huge">
            User not found
          </Header>
        ) : (
          <Table celled textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Repository</Table.HeaderCell>
                <Table.HeaderCell>Language</Table.HeaderCell>
                <Table.HeaderCell>Commits</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((x, index) => {
                return <RepoCard key={index} info={x} />;
              })}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  );
}
