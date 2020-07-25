import axios from "axios";
const server = "http://localhost:5000";
/*const header = {
  Authorization: "Bearer " + localStorage.getItem("jwt"),
};*/

export const signUpCall = async (info, response) => {
  const url = server + "/signup";

  axios.post(url, info).then((res) => {
    if (!res.data.error) {
      response(res.data.message);
    } else {
      response(res.data.error);
    }
  });
};

export const signInCall = async (info, response, userdata) => {
  const url = server + "/signin";

  axios.post(url, info).then((res) => {
    if (!res.data.error) {
      response(res.data.message);
      userdata(res.data);
    } else {
      response(res.data.error);
    }
  });
};

export const createPost = async (info, response) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/createpost";
  axios
    .post(url, info, {
      headers: header,
    })
    .then((res) => {
      if (!res.data.error) {
        response(res.data.message);
      } else {
        response(res.data.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPost = async (setData) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/allpost";
  try {
    const {
      data: { posts },
    } = await axios.get(url, { headers: header });
    return posts;
  } catch (err) {
    console.log(err);
  }
};

export const getUserPost = async (setData) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/myposts";
  axios
    .get(url, {
      headers: header,
    })
    .then((res) => {
      setData(res.data.posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const PostLike = (info, setLikes) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/like";
  axios
    .put(url, info, {
      headers: header,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const PostUnlike = (info) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/unlike";
  axios
    .put(url, info, {
      headers: header,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const insertComment = async (info) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/comment";
  const {
    data: {
      result: { comments },
    },
  } = await axios.put(url, info, {
    headers: header,
  });
  console.log("backkk", comments);
  return comments;
};

export const deletePost = async (id) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/delete/" + id;
  const { data } = await axios.delete(url, {
    headers: header,
  });
  return false;
};

export const getUserProfilePosts = async (id) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/userprofile/" + id;
  console.log(url);
  const { data } = await axios.get(url, {
    headers: header,
  });
  console.log("asd", data);
  return data;
};

export const followUser = async (id) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/followUser/" + id;
  console.log(url);
  const { data } = await axios.get(url, {
    headers: header,
  });
  console.log("asd", data.result1.followers.length);
  return data.result1.followers.length;
};

export const unfollowUser = async (id) => {
  const header = {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  };
  const url = server + "/unfollowUser/" + id;
  console.log(url);
  const { data } = await axios.get(url, {
    headers: header,
  });
  return data.result1.followers.length;
};
