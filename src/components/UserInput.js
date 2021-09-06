import React, { useState } from "react";
import { Icon, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function UserInput() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="App--input">
      <Input
        placeholder="Username..."
        onKeyPress={(e) => {
          if (e.key === "Enter") window.location.href = `/${userInput}`;
        }}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />

      <Link to={`/${userInput}`}>
        <Icon name="search" size="big" />
        <p>Search</p>
      </Link>
    </div>
  );
}
