import React, { useState, useEffect } from "react";
import styles from "./Box.module.css";
import { createPost } from "../../api/api";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [response, setresponse] = useState("");
  const history = useHistory();
  //const [cloudImage, setcloudImage] = useState("");
  useEffect(() => {
    if (response) {
      history.push("/");
      M.toast({ html: response });
    }
  });
  const PostCloud = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "instagram-clone-harjeev");
    if (image && title && desc) {
      fetch(
        "https://api.cloudinary.com/v1_1/instagram-clone-harjeev/image/upload",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          //console.log(data.secure_url);
          //setcloudImage(data.secure_url);
          const info = {
            title: title,
            body: desc,
            photo: data.secure_url,
          };
          const FetchAPI = async () => {
            await createPost(info, setresponse);
          };
          FetchAPI();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      M.toast({ html: "Please Enter all fields" });
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.innerbox}>
        <form className={styles.form}>
          <h2 className={styles.instaFont}>New Post</h2>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="title"
          />
          <input
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            placeholder="description"
          />
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button
            onClick={PostCloud}
            className="btn waves-effect waves-light"
            type="button"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
export default Create;
