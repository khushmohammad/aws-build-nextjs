import axios from "axios";
// import { getToken } from "./user.service";

export const getToken = async () => {
  // return await axios.get("/api/get-token");
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getAllFeeds = async (page = 1, limit = 10) => {
  const token = await getToken();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getAllFeeds?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const postslist = await response?.data?.body?.allBody?.docs;
      const PostCount = 0 //await response?.data?.body?.allBody?.totalDocs

      const newarray = await Promise.all(
        postslist.map(async (postData) => {
          const res = await getUserInfoByUserId(postData.userId);
          const userData = await res?.data?.body;
          //console.log(userData);
          const newdata = await { ...postData, postCreatedBy: userData };
          return newdata;
        })
      );
      //console.log(newarray, "newarray");
      return { newarray, PostCount };
    }
  } catch (err) {
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
  }
};

export const getAllPostsByUserId = async (
  page = 1,
  limit = 10,
  userId = ""
) => {
  const token = await getToken();

  // console.log(token);
  //console.log(userId,"userId");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getAllPostsByUserId/${userId}?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status == 200) {
      const postslist = await response?.data?.body?.allBody?.docs;
      const PostCount = await response?.data?.body?.allBody?.totalDocs
      const newarray = await Promise.all(
        postslist.map(async (postData) => {
          const res = await getUserInfoByUserId(postData.userId);
          const userData = await res?.data?.body;
          const newdata = await { ...postData, postCreatedBy: userData };
          return newdata;
        })
      );
      return { newarray, PostCount };
    }
  } catch (err) {
    // try {
    //   const response = await axios.get(
    //     `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getAllPostsByUserId?page=${page}&limit=${limit}`,
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   );
    //   return response;
    // }
    console.log(err);
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
  }
};
export const getPostsByTokenUserId = async (page = 1, limit = 10) => {
  const token = await getToken();

  console.log(token);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/getPostsByTokenUserId?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status == 200) {
      const postslist = await response?.data?.body?.allBody?.docs;
      const PostCount = await response?.data?.body?.allBody?.totalDocs
      const newarray = await Promise.all(
        postslist.map(async (postData) => {
          const res = await getUserInfoByUserId(postData.userId);
          const userData = await res?.data?.body;
          const newdata = await { ...postData, postCreatedBy: userData };
          return newdata;
        })
      );

      return { newarray, PostCount };
    }
  } catch (err) {
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
  }
};


export const getPostsByPostId = async (PostId) => {
  const token = await getToken();

  // console.log(token);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getMediaByPostId/${PostId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const postdata = await response?.data?.body?.allBody;
      const res = await getUserInfoByUserId(postdata.userId);
      const userData = await res?.data?.body;
      //console.log(userData);
      const newdata = await { ...postdata, postCreatedBy: userData };
      return newdata;
    }
    return response;
  } catch (err) {
    console.log(err);
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
  }
};
export const getAllLikesByPostId = async (postId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getMediaByPostId/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const allLikessArr = await response?.data?.body?.allBody?.postLikes;

      // console.log(allLikessArr, "allLikessArr");
      const newarray = await Promise.all(
        allLikessArr &&
        allLikessArr.map(async (likeData) => {
          const res =
            likeData && (await getUserInfoByUserId(likeData.userId));
          const userData = await res?.data?.body;

          const newdata = await { ...likeData, userDetails: userData };
          //console.log(newdata, "userData");
          return newdata;
        })
      );
      // console.log(newarray, "newarray");
      return newarray;
    }
  } catch (err) {
    return err;
  }
};

export const getUserInfoByUserId = async (userId = "") => {
  const token = await getToken();

  // console.log(token);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfile/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
  }
};

export const deletePostByPostId = async (postId) => {
  const token = await getToken();

  // alert(postId)

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/DeletePostByPostId/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const editPostByPostId = async (postId) => {
  const token = await getToken();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getMediaByPostId/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (postData) => {
  const token = await getToken();
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/createPost`,
      postData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const updatePost = async (postData, postid) => {
  const token = await getToken();
  await axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/UpdateByPostId/${postid}`,
      postData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const likePostByUser = async (postId, reactionId) => {
  const token = await getToken();
  const likeData = { postId: postId, reactionEmoji: reactionId };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/ToggleLike`,
      likeData,
      {
        "Content-Type": "multipart/form-data",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const pinPostByUser = async (postId) => {
  const token = await getToken();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/posts/togglePinPost/${postId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllCommentsByPostId = async (postId) => {
  const token = await getToken();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getMediaByPostId/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const allCommentssArr = await response?.data?.body?.allBody?.comments;

      const newarray = await Promise.all(
        allCommentssArr &&
        allCommentssArr.map(async (commentsData) => {
          const res =
            commentsData && (await getUserInfoByUserId(commentsData.userId));
          const userData = await res?.data?.body;
          const newdata = await { ...commentsData, userDetails: userData };
          return newdata;
        })
      );

      return newarray;
    }
  } catch (err) {
    return err;
  }
};

export const postCommentbyPostId = async (postId, commentData) => {
  const token = await getToken();

  const payloadData = {
    postId: postId,
    mainComment: {
      commentText: commentData.commentInput,
    },
  };

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userComment/post/postCommentbyPostId`,
      payloadData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
};

export const postCommentDeletebyPostId = async (postId, commentId) => {
  const token = await getToken();
  // const payloadData = {
  //   commentId: postId,
  //   postId: commentId
  // }
  // console.log(payloadData, "payloadData");
  var data = new FormData();
  data.append("commentId", commentId);
  data.append("postId", postId);
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userComment/post/deleteCommentByCommentId`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }
    );
    console.log(res, "res");
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
};
