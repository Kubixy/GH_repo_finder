import { useState } from "react";
import { Icon, Input } from "semantic-ui-react";

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

      <div
        className="App--input__search"
        onClick={() => {
          window.location.href = `/${userInput}`;
        }}
      >
        <Icon name="search" size="big" />
        <p>Search</p>
      </div>
    </div>
  );
}
