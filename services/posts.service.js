import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";
import { getUserInfoByUserId, mergeUserBasicDetails } from "./user.service";

export const getFeeds = async (params) => {
  const token = await getToken();

  let arr = [
    {
      page: "home",
      apiPath: `posts/getUserPost/getAllFeeds?pageNumber=${
        params?.page || 1
      }&limit=${params?.limit || 10}`,
    },
    {
      page: "myProfile",
      apiPath: `posts/getUserPost/getAllUserPosts?pageNumber=${
        params?.page || 1
      }&limit=${params?.limit || 10}`,
    },
    {
      page: "userProfile",
      apiPath: `posts/getUserPost/getAllUserPosts?userId=${
        params.groupanduserId
      }&pageNumber=${params?.page || 1}&limit=${params?.limit || 10}`,
    },
    {
      page: "group",
      apiPath: `posts/getUserPost/getAllUserPosts?groupId=${
        params.groupanduserId
      }&pageNumber=${params?.page || 1}&limit=${params?.limit || 10}`,
    },
    {
      page: "savedPost",
      apiPath: `posts/userPost/getAllSavedPosts?pageNumber=${
        params?.page || 1
      }&limit=${params?.limit || 10}`,
    },
  ];
  let obj = arr.find((o) => o.page === params.activePage);

  const res = await apiBaseURL.get(obj.apiPath, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

// getPostsByPostId
export const getPostsByPostId = async (PostId) => {
  const token = await getToken();

  try {
    const response = await apiBaseURL.get(
      `posts/getUserPost/getPostByPostId/${PostId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const postdata = await response?.data?.body?.feeds[0];
      const res = await getUserInfoByUserId(postdata.userId);
      const userData = await res?.data?.body;
      const newdata = await { ...postdata, userDetails: userData };
      return newdata;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
};
export const getAllLikesByPostId = async (postId) => {
  const token = await getToken();
  try {
    const response = await apiBaseURL.get(
      `posts/userPost/post/getMediaByPostId/${postId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const allLikessArr = await response?.data?.body?.allBody?.postLikes;

      const newarray = await Promise.all(
        allLikessArr &&
          allLikessArr.map(async (likeData) => {
            const res =
              likeData && (await getUserInfoByUserId(likeData.userId));
            const userData = await res?.data?.body;

            const newdata = await { ...likeData, userDetails: userData };

            return newdata;
          })
      );

      return newarray;
    }
  } catch (err) {
    return err;
  }
};

export const deletePostByPostId = async (postId) => {
  const token = await getToken();

  // alert(postId)

  try {
    const response = await apiBaseURL.delete(
      `posts/userPost/post/DeletePostByPostId/${postId}`,
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
    const response = await apiBaseURL.get(
      `posts//getUserPost/getPostByPostId/${postId}`,
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
  try {
    const res = await apiBaseURL.post(`posts/userPost/createPost`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (postData) => {
  const token = await getToken();
  try {
    const res = await apiBaseURL.patch(
      `posts/userPost/post/UpdateByPostId`,
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
    const response = await apiBaseURL.post(
      `posts/userPost/post/ToggleLike`,
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
    const response = await apiBaseURL.post(
      `posts/userPost/posts/togglePinPost/${postId}`,
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
    const res = await apiBaseURL.post(
      `posts/userComment/post/postCommentbyPostId`,
      payloadData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (err) {
    return err?.response;
  }
};

export const postCommentDeletebyPostId = async (postId, commentId) => {
  const token = await getToken();

  var data = new FormData();
  data.append("commentOrReplyId", commentId);
  data.append("postId", postId);
  try {
    const res = await apiBaseURL.delete(
      `posts/userComment/post/deleteCommentByCommentId`,
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
    const res = await apiBaseURL.get(
      `posts/getUserPost/postMedia?pageNumber=1&limit=10`,
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
    const res = await apiBaseURL.post(`posts/userPost/share/${postId}`, "", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    const res = await apiBaseURL.get(
      `posts/userComment/all/${postId}?pageNumber=${pageNumber}&limit=${limit}&level=${level}&parentId=${parentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.status == 200) {
      const allCommentList = await res?.data?.body;

      if (allCommentList == undefined || allCommentList.length == 0) {
        return [];
      }

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
    const response = await apiBaseURL.post(
      `posts/userPost/savedPost/${postId}`,
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

export const getSavePostListApi = async (page = 1, limit = 10) => {
  const token = await getToken();

  try {
    const response = await apiBaseURL.get(
      `posts/userPost/getAllSavedPosts?pageNumber=${page}&limit=${limit}`,
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
    console.log(err);
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
  }
};
