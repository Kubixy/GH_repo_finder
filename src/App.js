import "./App.scss";
import UserPage from "./pages/UserPage";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/followers/:user"
            component={() => <UserPage location={"followers"} />}
          />
          <Route
            exact
            path="/stars/:user"
            component={() => <UserPage location={"stars"} />}
          />
          <Route
            exact
            path="/repositories/:user"
            component={() => <UserPage location={"repositories"} />}
          />
          <Route path="/" component={() => <MainPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
