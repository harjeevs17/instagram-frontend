import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import { PostLike, PostUnlike } from "../../api/api";
const Likes = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  useEffect(() => {
    props.likes.includes(state._id) ? setLiked(true) : setLiked(false);
    setTotalLikes(props.likes.length);
  }, []);
  const likeToggle = async () => {
    const info = {
      postId: props.postId,
      userid: state._id,
    };
    if (liked == true) {
      PostUnlike(info);
      setLiked(false);
      setTotalLikes(parseInt(totalLikes) - 1);
    } else {
      PostLike(info);
      setLiked(true);
      setTotalLikes(parseInt(totalLikes) + 1);
    }
  };

  return (
    <>
      <i
        className="material-icons"
        onClick={likeToggle}
        style={{
          color: liked == true ? "red" : "black",
          fontSize: "30px",
          cursor: "pointer",
        }}
      >
        favorite
      </i>
      <p>{totalLikes} likes</p>
    </>
  );
};

export default Likes;
