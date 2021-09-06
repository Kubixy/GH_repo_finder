import "./App.scss";
import { Icon } from "semantic-ui-react";
import React from "react";
import UserInput from "./components/UserInput";
import CardList from "./components/CardList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Icon name="github" size="massive" />
      <h1>Search for a user</h1>

      <Router>
        <UserInput />
        <Switch>
          <Route path="/:user" component={() => <CardList />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
