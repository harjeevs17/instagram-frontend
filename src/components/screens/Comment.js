import React, { useEffect, useState } from "react";
import { insertComment } from "../../api/api";

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [commentValue, setcommentValue] = useState("");
  useEffect(() => {
    setComments(props.comment);
    console.log("hi");
  }, [props.comment]);
  const addComment = async (e, postId) => {
    if (e.key === "Enter") {
      const data = {
        comment: commentValue,
        postId: postId,
      };
      setComments(await insertComment(data));
      setcommentValue("");
    }
  };
  return (
    <>
      {comments.map((comment) => (
        <div>
          <span style={{ fontWeight: "500" }}>{comment.postedBy.name}</span>
          <span>&nbsp;{comment.text}</span>
        </div>
      ))}
      <input
        type="text"
        value={commentValue}
        onChange={(e) => setcommentValue(e.target.value)}
        placeholder="Add a comment"
        onKeyDown={(e) => addComment(e, props.postId)}
      />
    </>
  );
};
export default Comment;
