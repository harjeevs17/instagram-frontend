import React from "react";
import styles from "./Box.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.box}>
      <div className={styles.innerbox}>
        <form className={styles.form}>
          <h2 className={styles.instaFont}>Instagram</h2>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button className="btn waves-effect waves-light" type="button">
            Login
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
