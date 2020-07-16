import React, { useState, useEffect } from "react";
import styles from "./Box.module.css";
import { Link } from "react-router-dom";
import { signUpCall } from "../../api/api";
import M from "materialize-css";
const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [response, setresponse] = useState("");
  useEffect(() => {
    if (response) {
      M.toast({ html: response });
    }
    setresponse("");
  }, [response]);
  const signUpFunction = () => {
    const info = {
      name,
      email,
      password,
    };
    const fetchAPI = async () => {
      await signUpCall(info, setresponse);
    };
    fetchAPI();
  };

  return (
    <div className={styles.box}>
      <div className={styles.innerbox}>
        <form className={styles.form}>
          <h2 className={styles.instaFont}>Instagram</h2>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
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
            onClick={signUpFunction}
            className="btn waves-effect waves-light"
            type="button"
          >
            Login
          </button>
          <div className={styles.bottomOptions}>
            <Link to="/signin">Already have an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
