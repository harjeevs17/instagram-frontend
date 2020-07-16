import React, { useEffect, useState, useContext } from "react";
import styles from "./Home.module.css";
import "./Home.modules.css";
import { getPost, PostLike, PostUnlike } from "../../api/api";
import { UserContext } from "../../App";
const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await getPost(setData);
    }
    fetchData();
  }, []);
  console.log("data is", data);
  console.log("state is", state);
  const Feedback = (postId, mode) => {
    mode == 0 ? likePost(postId) : unlikePost(postId);
  };
  const likePost = async (postId) => {
    const info = {
      postId,
    };
    console.log("Liked", info);
    const data = await PostLike(info);
    alert("Liked");
  };
  const unlikePost = async (postId) => {
    const info = {
      postId,
    };
    console.log("Unliked");
    const data = await PostUnlike(info);
    alert("Liked");
  };
  return (
    <div className={styles.box}>
      <div className={styles.innerbox}>
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
              {item.likes.includes(state._id) ? (
                <i
                  onClick={() => unlikePost(item._id)}
                  className="material-icons"
                  style={{ color: "red", fontSize: "30px" }}
                >
                  favorite
                </i>
              ) : (
                <i
                  onClick={() => likePost(item._id)}
                  className="material-icons"
                  style={{ color: "black", fontSize: "30px" }}
                >
                  favorite
                </i>
              )}
              <p>{item.likes.length} likes</p>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="Add a comment" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
