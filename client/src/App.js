import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BubblePage from "./components/BubblePage"

import { PrivateRoute } from "./utils/PrivateRoute"


import Login from "./components/Login";
import "./styles.scss";
import ColorList from "./components/ColorList";

function App() {
  return (
    <Router>
      <div className="App">
      <div>
          <Link to="/">Home</Link>
          <br />
          <Link to="/bubbles" > Bubbles</Link>
        </div>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        
        <PrivateRoute path="/bubbles">
          <Route render={props => <BubblePage {...props} />} />
        </PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
