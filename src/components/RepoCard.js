import React from "react";
import { Table } from "semantic-ui-react";

export default function RepoCard(props) {
  const { info, index } = props;

  return (
    <Table.Row key={index} onClick={() => window.open(info.url)}>
      <Table.Cell>{info?.name}</Table.Cell>
      <Table.Cell>{info?.primaryLanguage?.name}</Table.Cell>
      <Table.Cell>{info?.object?.history?.totalCount}</Table.Cell>
    </Table.Row>
  );
}

/* <a
className="App--list__card"
href={info.url}
target="_blank"
rel="noreferrer"
> */
