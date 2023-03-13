import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";

export const getUserInfoByUserId = async (userId = "") => {
  const token = await getToken();

  // console.log(token);
  try {
    const response = await apiBaseURL.get(`profiles/myProfile/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(response);
    return response;
  } catch (err) {
    return err;
  }
};

export const updateUserData = async (data) => {
  const token = await getToken();
  console.log(data);

  const res = await apiBaseURL.patch(
    `/profiles/myProfileUpdates/update`,
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
  const res = await apiBaseURL.patch(
    `/profiles/myProfileUpdates/update/images?imageName=${imageType}`,
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
  try {
    const res = await apiBaseURL.post(
      `/profiles/userProfile/byUserIds`,
      { userId: data },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const mergeUserBasicDetails = async (userIdArr) => {
  const dataWithUserDetails = await Promise.all(
    userIdArr &&
    userIdArr.map(async (singleData) => {
      const res = singleData && (await getUserInfoByUserId(singleData.userId));
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

