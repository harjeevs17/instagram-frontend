import React, { useEffect, useState, useContext } from "react";
import styles from "./Profile.module.css";
import {
  getUserProfilePosts,
  followUser,
  unfollowUser,
  updatePicture,
} from "../../api/api";
import ProfilePosts from "./ProfilePosts";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
const UserProfile = (props) => {
  //const [u_id, setuserid] = useState("");
  const { userid } = useParams();
  const [data, setData] = useState([]);
  const [sameUser, setSameUser] = useState(false);
  const [followers, setfollowers] = useState(0);
  const [picture, setpicture] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const [doesfollow, setdoesfollow] = useState(false);
  const [imageLoading, setimageLoading] = useState(true);
  const [reloader, setreloader] = useState(0);
  useEffect(() => {
    async function fetchData() {
      await getUserProfilePosts(userid).then((res) => {
        setData(res);
        setimageLoading(false);
        setpicture(res.user.picture);
        setfollowers(res.user.followers.length);
        console.log("resid", res);
        console.log("state", state._id);
        if (res.user._id === state._id) {
          console.log("same");
          setSameUser(true);
        }
        if (res.user.followers.includes(state._id)) {
          setdoesfollow(true);
        }
      });
    }
    if (state) {
      fetchData();
    }
  }, [state]);
  useEffect(() => {
    console.log("math", props);
  }, [reloader]);

  const follow = async (id) => {
    setfollowers(await followUser(id));
    setdoesfollow(true);
  };
  const unfollow = async (id) => {
    setfollowers(await unfollowUser(id));
    setdoesfollow(false);
  };
  const test = (pic) => {
    setpicture(pic);
    setimageLoading(true);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "instagram-clone-harjeev");
    if (picture) {
      fetch(
        "http://api.cloudinary.com/v1_1/instagram-clone-harjeev/image/upload",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("image", data.secure_url);
          setimageLoading(false);
          const FetchAPI = async () => {
            localStorage.getItem(
              "user",
              JSON.stringify({ ...state, picture: data.secure_url })
            );
            dispatch({ type: "UPDATEPIC", payload: data.secure_url });
            await updatePicture(data.secure_url).then((res) => {
              console.log("stateInn", state);
              setpicture(data.secure_url);
            });
          };
          FetchAPI();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // M.toast({ html: "Please Enter all fields" });
    }
  };
  return (
    <>
      {data.user != undefined && data.posts != undefined ? (
        <div className={styles.profileBox}>
          <div className={styles.profileInfo}>
            <div className={styles.profileImgContainer}>
              <img
                style={{ borderRadius: "100%", height: 150 }}
                alt=""
                src={
                  imageLoading != true
                    ? picture
                    : "https://vnnc.org/wp-content/plugins/gallery-by-supsystic/src/GridGallery/Galleries/assets/img/loading.gif"
                }
              />
            </div>
            <div>
              <div className={styles.username}>{data.user.name}</div>
              <div className={styles.stats}>
                <span>{data.posts.length} posts</span>
                <span>{followers} follower</span>
                <span>{data.user.following.length} following</span>
              </div>
              <div className={styles.email}>{data.user.email}</div>
              {sameUser == false ? (
                doesfollow == true ? (
                  <button onClick={() => unfollow(data.user._id)} class="btn">
                    UnFollow
                  </button>
                ) : (
                  <button onClick={() => follow(data.user._id)} class="btn">
                    Follow
                  </button>
                )
              ) : (
                <></>
                /*<div class="file-field input-field">
                  <div class="btn">
                    <span>File</span>
                    <input
                      onChange={(e) => test(e.target.files[0])}
                      type="file"
                    />
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                  </div>
                </div>*/
              )}
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
              {data.posts.map((item, key) => (
                <ProfilePosts data={item} key={key} sameuser={sameUser} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h5 style={{ textAlign: "center" }}>Loading</h5>
      )}
    </>
  );
};
export default UserProfile;

/* */
