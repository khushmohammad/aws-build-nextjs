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
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/getUserPost/getAllFeeds?pageNumber=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const postslist = await response?.data?.body?.feeds;
      const PostCount = await response?.data?.body?.postCount?.postCount;

      //await response?.data?.body?.allBody?.totalDocs

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
  userId = "",
  pageName = ""
) => {
  const token = await getToken();

  // const page = pageName

  // console.log(token);
  //console.log(userId,"userId");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/getUserPost/getAllUserPosts?${pageName}=${userId}&pageNumber=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status == 200) {
      const postslist = await response?.data?.body?.feeds;
      const PostCount = await response?.data?.body?.postCount?.postCount;
      // await response?.data?.body?.allBody?.totalDocs
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
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/getUserPost/getAllUserPosts?pageNumber=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status == 200) {
      const postslist = await response?.data?.body?.feeds;
      const PostCount = await response?.data?.body?.postCount?.postCount;
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
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/getUserPost/getPostByPostId/${PostId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const postdata = await response?.data?.body?.feeds[0];
      const res = await getUserInfoByUserId(postdata.userId);
      const userData = await res?.data?.body;
      //console.log(userData);
      const newdata = await { ...postdata, postCreatedBy: userData };
      return newdata;
    }
    return response;
  } catch (err) {
    console.log(err);

    return err;
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
    return err;
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

export const updatePost = async (postData) => {
  const token = await getToken();
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/UpdateByPostId`,
      postData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
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

// export const getAllCommentsByPostId = async (postId) => {
//   const token = await getToken();
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getMediaByPostId/${postId}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     if (response.status == 200) {
//       const allCommentssArr = await response?.data?.body?.allBody?.comments;

//       const newarray = await Promise.all(
//         allCommentssArr &&
//         allCommentssArr.map(async (commentsData) => {
//           const res =
//             commentsData && (await getUserInfoByUserId(commentsData.userId));
//           const userData = await res?.data?.body;
//           const newdata = await { ...commentsData, userDetails: userData };
//           return newdata;
//         })
//       );

//       return newarray;
//     }
//   } catch (err) {
//     return err;
//   }
// };

export const mergeUserBasicDetails = async (userIdArr) => {
  const dataWithUserDetails = await Promise.all(
    userIdArr &&
      userIdArr.map(async (singleData) => {
        const res =
          singleData && (await getUserInfoByUserId(singleData.userId));
        const userData = await res?.data?.body;
        const newdata = await {
          ...singleData,
          userDetails: {
            userInfo: userData?.userInfo,
            profilePictureInfo: userData?.profilePictureInfo,
          },
        };
        return newdata;
      })
  );
  return dataWithUserDetails;
};

export const postCommentByPostId = async (
  postId,
  commentData,
  level,
  parentId
) => {
  const token = await getToken();
  const payloadData = {
    postId: postId,
    level: level,
    textInfo: commentData,
    parentId: parentId,
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
    // if (res.status === 200) {
    //   const dataWithUserDetails = await mergeUserBasicDetails([res?.data?.body])
    //   return dataWithUserDetails
    // } else {
    //   return res
    // }

    return res;
  } catch (err) {
    return err?.response;
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
  data.append("commentOrReplyId", commentId);
  // data.append("postId", postId);
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
    return res;
  } catch (err) {
    return err;
  }
};

export const getAllPostPhoto = async () => {
  const token = await getToken();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/getUserPost/postMedia?pageNumber=1&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const userPostshare = async (postId) => {
  const token = await getToken();

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/share/${postId}`,
      "",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getCommentbyPostId = async (
  postId = "",
  pageNumber = 1,
  limit = 5,
  level = 0,
  parentId = ""
) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userComment/all/${postId}?pageNumber=${pageNumber}&limit=${limit}&level=${level}&parentId=${parentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.status == 200) {
      const allCommentList = await res?.data?.body;
      // console.log(allCommentList, "allCommentList.length");
      if (allCommentList == undefined || allCommentList.length == 0) {
        return [];
      }
      // console.log(allCommentList, "allLikessArr");
      const dataWithUserDetails = await mergeUserBasicDetails(
        allCommentList.comments
      );
      const data = {
        comments: dataWithUserDetails,
        commentsOrReplyCounts: allCommentList.commentsOrReplyCounts,
      };
      return data;
    } else {
      return res;
    }

    // const comment = await res
    // const data = await comment?.data?.body
    // return data
  } catch (err) {
    console.log(err);
  }
};

export const savePostApi = async (postId) => {
  const token = await getToken();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/savedPost/${postId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response, "response");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getSavePostListApi = async (page = 1, limit = 10) => {
  const token = await getToken();

  // const page = pageName

  // console.log(token);
  //console.log(userId,"userId");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/getAllSavedPosts?pageNumber=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status == 200) {
      const postslist = await response?.data?.body?.feeds;
      const PostCount = await response?.data?.body?.postCount?.postCount;
      // await response?.data?.body?.allBody?.totalDocs
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
