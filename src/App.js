import "./App.scss";
import { Icon } from "semantic-ui-react";
import React, { useState } from "react";
import UserInput from "./components/UserInput";
import RepoCard from "./components/RepoCard";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <Icon name="github" size="massive" />
      <h1>Hello world</h1>

      <UserInput setData={setData} />

      <div className="App--list">
        {data.map((x, index) => {
          return <RepoCard key={index} info={x} />;
        })}
      </div>
    </div>
  );
}

export default App;

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

/* <Router>
        <div>
           A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. 
            <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/" />
          </Switch>
        </div>
      </Router> */
