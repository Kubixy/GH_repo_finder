import { useState } from "react";
import { Input } from "semantic-ui-react";

import "./UserInput.scss";

export default function UserInput() {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="App--input">
      <Input
        placeholder="Username..."
        onKeyPress={(e) => {
          if (e.key === "Enter" && userInput.length > 0)
            window.location.href = `/repositories/${userInput}`;
        }}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />

      <div
        className="App--input__search"
        onClick={() => {
          if (userInput.length > 0)
            window.location.href = `/repositories/${userInput}`;
        }}
      >
        <p>Search</p>
      </div>
    </div>
  );
}
