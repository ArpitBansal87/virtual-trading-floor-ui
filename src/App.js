import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App(props) {


  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
