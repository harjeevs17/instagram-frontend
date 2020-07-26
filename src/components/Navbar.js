import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { search } from "../api/api";
import M from "materialize-css";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [query, setquery] = useState("");
  const [data, setdata] = useState([]);
  const history = useHistory();
  const searchModal = useRef(null);
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  useEffect(() => {
    const fetchAPI = async () => {
      setdata(await search(query));
    };
    fetchAPI();
  }, [query]);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <a className="waves-effect modal-trigger" href="#modal1">
            <i className="material-icons">search</i>
          </a>
        </li>,
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
      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="email"
            placeholder="Search users"
            onChange={(e) => setquery(e.target.value)}
            value={query}
          />
          {data ? (
            <ul className="collection">
              {data.map((item) => {
                return (
                  <Link
                    /*to={{ pathname: `/userprofile/${item._id}` }} */ to={
                      "/userprofile/" + item._id
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setquery("");
                    }}
                  >
                    <div class="chip">
                      <img src={item.picture} alt="Contact Person" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            type="button"
          >
            search
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
