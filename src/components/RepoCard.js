import React from "react";
import {} from "semantic-ui-react";

export default function RepoCard(props) {
  const { info } = props;

  return (
    <a
      className="App--list__card"
      href={info.url}
      target="_blank"
      rel="noreferrer"
    >
      <p>{info.name}</p>
      <p>{info.primaryLanguage.name}</p>
    </a>
  );
}
