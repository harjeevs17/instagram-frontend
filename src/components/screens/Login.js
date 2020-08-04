import React, { useState, useEffect, useContext } from "react";
import styles from "./Box.module.css";
import { Link, useHistory } from "react-router-dom";
import { signInCall } from "../../api/api";
import M from "materialize-css";
import { UserContext } from "../../App";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [response, setresponse] = useState("");
  const [userData, setuserData] = useState({});
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  useEffect(() => {
    if (response) {
      M.toast({ html: response });
    }
    setresponse("");
    if (userData.user) {
      localStorage.setItem("jwt", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      dispatch({ type: "USER", payload: userData.user });
      history.push("/");
      M.toast({ html: "Logged in sucessfully" });
    }
    console.log("use data", userData);
  }, [response, userData, history, dispatch]);
  const LoginFunction = () => {
    setLoading(true);
    const info = {
      email,
      password,
    };
    const fetchAPI = async () => {
      await signInCall(info, setresponse, setuserData).then((res) => {
        setLoading(false);
      });
    };
    fetchAPI();
  };
  return (
    <div className={styles.box}>
      <div className={styles.innerbox}>
        <form className={styles.form}>
          <h2 className={styles.instaFont}>Instagram</h2>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            onClick={LoginFunction}
            disabled={loading ? true : false}
            className="btn waves-effect waves-light"
            type="button"
          >
            {loading ? "Loading" : "Login"}
          </button>
          <div className={styles.bottomOptions}>
            <Link to="/signup">Don't have an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
