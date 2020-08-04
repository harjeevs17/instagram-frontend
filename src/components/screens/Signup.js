import React, { useState, useEffect } from "react";
import styles from "./Box.module.css";
import { Link } from "react-router-dom";
import { signUpCall } from "../../api/api";
import M from "materialize-css";
const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [response, setresponse] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    if (response) {
      M.toast({ html: response });
    }
    setresponse("");
  }, [response]);
  /*const signUpFunction = () => {
    const info = {
      name,
      email,
      password,
    };
    const fetchAPI = async () => {
      await signUpCall(info, setresponse);
    };
    fetchAPI();
  };*/

  const signUpFunction = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "instagram-clone-harjeev");
    if (name && email && password && image) {
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
            name,
            email,
            password,
            picture: data.secure_url,
          };
          const FetchAPI = async () => {
            await signUpCall(info, setresponse);
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
          <h2 className={styles.instaFont}>Instagram</h2>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
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
            onClick={signUpFunction}
            className="btn waves-effect waves-light"
            type="button"
          >
            Login
          </button>
          <div className={styles.bottomOptions}>
            <Link to="/signin">Already have an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
