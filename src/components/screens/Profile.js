import React, { useEffect, useState, useContext } from "react";
import styles from "./Profile.module.css";
import { getUserPost } from "../../api/api";
import ProfilePosts from "./ProfilePosts";
import { UserContext } from "../../App";
const Profile = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      await getUserPost(setData);
    }
    fetchData();
  }, []);
  return (
    <>
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
            <div className={styles.username}>
              {state ? state.name : "Loading"}
            </div>
            <div className={styles.stats}>
              <span>{data.length} posts</span>
              <span>150 followers</span>
              <span>194 following</span>
            </div>
            <div className={styles.email}>
              {state ? state.email : "Loading"}
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            {data.map((item, key) => (
              <ProfilePosts data={item} key={key} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
