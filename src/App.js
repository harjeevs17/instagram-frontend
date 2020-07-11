import React from "react";
import Navbar from "../src/components/Navbar";
import "./App.css";
import Home from "../src/components/screens/Home";
import Profile from "../src/components/screens/Profile";
import SignIn from "../src/components/screens/Login";
import SignUp from "../src/components/screens/Signup";
import Create from "../src/components/screens/Create";
import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/create" component={Create} />
      </BrowserRouter>
    </div>
  );
}

export default App;
