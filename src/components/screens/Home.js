import React, { useEffect, useState, useContext } from "react";
import styles from "./Home.module.css";
import "./Home.modules.css";
import { motion } from "framer-motion";

import { getPost, insertComment } from "../../api/api";
import Likes from "./Likes";
import { UserContext } from "../../App";
import Comment from "./Comment";
import { Link } from "react-router-dom";
const Home = () => {
  const { state, dispatch } = useContext(UserContext);

  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setData(await getPost());
    }
    fetchData();
  }, []);
  console.log("front", data);

  return (
    <>
      <div className={styles.main}>
        {data.map((item, key) => (
          <motion.div
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            className="card"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="card-content">
              <Link to={{ pathname: `userprofile/${item.postedBy._id}` }}>
                <h5>{item.postedBy.name}</h5>
              </Link>
              <img
                className={styles.image}
                src={
                  item.photo === "No photo"
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
                    : item.photo
                }
              />

              <Likes likes={item.likes} postId={item._id} />
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <Comment comment={item.comments} postId={item._id} />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};
export default Home;
