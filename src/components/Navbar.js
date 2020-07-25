import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to={{ pathname: `userprofile/${state._id}` }}>Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create</Link>
        </li>,
        <li>
          <button
            className="btn"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/signin">Sign In</Link>
        </li>,
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link className="brand-logo left" to={state ? "/" : "/signin"}>
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
/*<li>
            <Link to="/">Home</Link>
          </li> */
