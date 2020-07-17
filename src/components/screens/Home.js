import React, { useEffect, useState, useContext } from "react";
import styles from "./Home.module.css";
import "./Home.modules.css";
import { getPost, insertComment } from "../../api/api";
import Likes from "./Likes";
import { UserContext } from "../../App";
const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setData(await getPost());
    }
    fetchData();
  }, []);
  console.log("front", data);
  console.log("comments", comments);
  const addComment = (e, postId) => {
    console.log("id", postId);
    if (e.key === "Enter") {
      const data = {
        comment: e.target.value,
        postId: postId,
      };
      insertComment(data);
    }
  };
  return (
    <div className={styles.box}>
      <div className={styles.innerbox}>
        <p>{state ? state.name : ""}</p>
        <p>{state ? state._id : ""}</p>
        {data.map((item, key) => (
          <div className="card" key={key}>
            <h5>{item.postedBy.name}</h5>
            <div>
              <img
                className={styles.test}
                alt=""
                src={
                  item.photo === "No photo"
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
                    : item.photo
                }
              />
            </div>
            <div className="card-content">
              <Likes likes={item.likes} postId={item._id} />
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input
                type="text"
                placeholder="Add a comment"
                onKeyDown={(e) => addComment(e, item._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
