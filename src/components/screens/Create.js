import React from "react";
import styles from "./Box.module.css";

const Create = () => {
  return (
    <div className={styles.box}>
      <div className={styles.innerbox}>
        <form className={styles.form}>
          <h2 className={styles.instaFont}>New Post</h2>
          <input type="text" placeholder="title" />
          <input type="text" placeholder="description" />
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button className="btn waves-effect waves-light" type="button">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
export default Create;
