import React, { useEffect, useState, useContext } from "react";
import styles from "./Profile.module.css";
import { getUserProfilePosts, followUser, unfollowUser } from "../../api/api";
import ProfilePosts from "./ProfilePosts";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  //const [u_id, setuserid] = useState("");
  const { userid } = useParams();
  const [data, setData] = useState([]);
  const [sameUser, setSameUser] = useState(false);
  const [followers, setfollowers] = useState(0);
  const { state, dispatch } = useContext(UserContext);
  const [doesfollow, setdoesfollow] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await getUserProfilePosts(userid).then((res) => {
        setData(res);
        setfollowers(res.user.followers.length);
        console.log("resid", res.user._id);
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

  const follow = async (id) => {
    setfollowers(await followUser(id));
    setdoesfollow(true);
  };
  const unfollow = async (id) => {
    setfollowers(await unfollowUser(id));
    setdoesfollow(false);
  };
  console.log("same", sameUser);
  return (
    <>
      {data.user != undefined && data.posts != undefined ? (
        <div className={styles.profileBox}>
          <div className={styles.profileInfo}>
            <div className={styles.profileImgContainer}>
              <img
                style={{ borderRadius: "100%" }}
                alt="profileImage"
                src="https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/13129942_1836623523231666_842799317_a.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_ohc=iR3aXkFco8YAX_ZChQD&oh=d606848434cda3983f110f95bc4f0926&oe=5F3332B4"
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
                ""
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
        "Loading"
      )}
    </>
  );
};
export default UserProfile;

/* */
