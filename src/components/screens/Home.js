import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import "./Home.modules.css";
import axios from "axios";
import { getPost } from "../../api/api";
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await getPost(setData);
    }
    fetchData();
  }, []);
  const postBlock = () => (
    <div className="card">
      <h5>Harjeev</h5>
      <div>
        <img
          className={styles.test}
          alt="postImage"
          src="https://images.unsplash.com/photo-1594057045119-75a282c808cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
        />
      </div>
      <div className="card-content">
        <i class="material-icons" style={{ color: "red", fontSize: "30px" }}>
          favorite
        </i>
        <h6>Caption</h6>
        <p>This is the content</p>
        <input type="text" placeholder="Add a comment" />
      </div>
    </div>
  );
  return (
    <div className={styles.box}>
      <div className={styles.innerbox}></div>
      {postBlock}
    </div>
  );
};
export default Home;
