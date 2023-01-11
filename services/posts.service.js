import axios from "axios";
// import { getToken } from "./user.service";

export const getToken = async () => {
  // return await axios.get("/api/get-token");
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getAllFeeds = async (page = 1, limit = 2) => {
  const token = await getToken();

  console.log("token here", token);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getAllFeeds?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
  }
};

export const getAllPostsByUserId = async (page = 1, limit = 2) => {
  const token = await getToken();

  // console.log(token);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/getAllPostsByUserId?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    const status = err.response.status;
    const message = err.response.data;

    return { message, status };
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


  const likeData = { postId: postId, reactionEmoji: reactionId }


  // alert(postId)

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/posts/userPost/post/ToggleLike`, likeData,
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
