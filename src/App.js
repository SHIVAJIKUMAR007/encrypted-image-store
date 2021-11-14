import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  document.body.style = "background: #1DA1F2;";
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
