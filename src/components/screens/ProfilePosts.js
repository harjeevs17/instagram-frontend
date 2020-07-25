import React, { useState } from "react";
import { deletePost } from "../../api/api";
import styles from "./Profile.module.css";

const ProfilePosts = (props) => {
  const [active, setActive] = useState(true);
  const deleteP = async (id) => {
    console.log(id);
    const deleteAPI = async () => {
      setActive(deletePost(id));
      console.log("active", active);
    };
    deleteAPI();
  };
  return (
    <span className={styles.imgItem}>
      {active == true ? (
        <>
          <img alt="post" src={props.data.photo} />
          {props.sameuser == true ? (
            <i
              onClick={() => deleteP(props.data._id)}
              style={{ visibility: "hidden" }}
              className="material-icons"
            >
              delete
            </i>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </span>
  );
};

export default ProfilePosts;
