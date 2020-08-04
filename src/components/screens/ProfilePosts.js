import React, { useState, useRef, useEffect } from "react";
import { deletePost } from "../../api/api";
import styles from "./Profile.module.css";
import M from "materialize-css";
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
  const imageModal = useRef(null);
  useEffect(() => {
    M.Modal.init(imageModal.current);
  }, []);

  return (
    <>
      <div className={styles.imageWrapper}>
        <a
          className="waves-effect modal-trigger"
          href={"#showimage" + props.data._id}
        >
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
        </a>
      </div>

      <div
        id={"showimage" + props.data._id}
        className="modal"
        ref={imageModal}
        style={{ color: "black", height: 500, width: 500, overflowY: "hidden" }}
      >
        <img
          style={{ height: "100%", width: "100%" }}
          alt="post"
          src={props.data.photo}
        />
      </div>
    </>
  );
};

export default ProfilePosts;
