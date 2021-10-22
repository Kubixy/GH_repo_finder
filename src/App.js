import "./App.scss";
import UserPage from "./pages/UserPage";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:user" component={() => <UserPage />} />
          <Route path="/" component={() => <MainPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
