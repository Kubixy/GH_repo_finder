import React, { useState } from "react";
import { Icon, Input } from "semantic-ui-react";
import { githubV4Api } from "../utils/api";

export default function UserInput(props) {
  const { setData } = props;
  const [userInput, setUserInput] = useState("");

  const submitData = (input) => {
    if (input.length > 0)
      githubV4Api(input).then((data) => {
        setData(data.data.data.user.repositories.nodes);
      });
  };

  return (
    <div className="App--input">
      <Input
        placeholder="Username"
        onKeyPress={(e) => {
          if (e.key === "Enter") submitData(userInput);
        }}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <Icon
        name="search"
        size="big"
        maxLength="39"
        onClick={() => {
          submitData(userInput);
        }}
      />
    </div>
  );
}
