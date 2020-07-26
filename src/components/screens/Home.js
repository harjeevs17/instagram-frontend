import React, { useEffect, useState, useContext } from "react";
import styles from "./Home.module.css";
import "./Home.modules.css";
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
    <div className={styles.box}>
      {data.length == 0 ? (
        <h5 style={{ textAlign: "center" }}>
          You could use the search feature to find some users
        </h5>
      ) : (
        ""
      )}
      <div className={styles.innerbox}>
        {data.map((item, key) => (
          <div className="card" key={key}>
            <Link to={{ pathname: `userprofile/${item.postedBy._id}` }}>
              <h5>{item.postedBy.name}</h5>
            </Link>
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
              <Comment comment={item.comments} postId={item._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
