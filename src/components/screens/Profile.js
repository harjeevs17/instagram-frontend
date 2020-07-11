import React from "react";
import styles from "./Profile.module.css";
const Profile = () => {
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
            <div className={styles.username}>harjeevs17</div>
            <div className={styles.stats}>
              <span>4 posts</span>
              <span>150 followers</span>
              <span>194 following</span>
            </div>
            <div className={styles.email}>Harjeev Singh</div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.gallery}>
          <img
            alt="post"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            alt="post"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            alt="post"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            alt="post"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            alt="post"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
          <img
            alt="post"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          />
        </div>
      </div>
    </>
  );
};
export default Profile;
