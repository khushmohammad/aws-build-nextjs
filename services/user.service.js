import axios from "axios";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getUserData = async () => {
  const token = await getToken();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfile`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.body;
};

export const updateUserData = async (data) => {
  const token = await getToken();

  //console.log(data, "data");
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfileUpdates/update`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const updateProfileAndCoverPic = async (imageType, image) => {
  const token = await getToken();
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfileUpdates/update/images?imageName=${imageType}`,
    { photo: image },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const getUserDetailsByUserId = async (data) => {
  const token = await getToken();
  console.log("data:::", data);
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/userProfile/byUserIds`,
      { userId: data },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("i am here", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
