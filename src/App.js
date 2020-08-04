import React, { createContext, useReducer, useEffect, useContext } from "react";
import "./App.css";
import Home from "../src/components/screens/Home";
import Profile from "../src/components/screens/Profile";
import UserProfile from "../src/components/screens/UserProfile";
import SignIn from "../src/components/screens/Login";
import SignUp from "../src/components/screens/Signup";
import Create from "../src/components/screens/Create";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
import Navbar from "../src/components/Navbar";
import { HashRouter as Router } from "react-router-dom";
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      // history.push("/");
    } else {
      history.push("/signin");
    }
  }, [dispatch, history]);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/userprofile/:userid" component={UserProfile} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
