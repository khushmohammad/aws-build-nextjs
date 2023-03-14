import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";
import { getUserInfoByUserId } from "./user.service";

export const countriesList = async (inputValue) => {
  const res = await apiBaseURL.get(`users/country/all/${inputValue}`);
  const countri = await res.data.body;
  let newArrayOBj1 = [];
  countri.forEach((element) => {
    const data = { value: element.id, label: element.name };
    return newArrayOBj1.push(data);
  });

  return newArrayOBj1;
};

export const getMaritalStatus = async () => {
  const token = await getToken();

  const res = await apiBaseURL.get(`profiles/dropdowns/values/MaritalStatus`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const data = await res.data;

  return data;
};

// export const clearEmpties = (obj) => {
//     for (var propName in obj) {
//         if (typeof obj[propName] == "object")
//             clearEmpties(obj[propName])
//         if (obj[propName] === '' || obj[propName] === '')
//             delete obj[propName];
//     }
// }

export const resendEmail = async (userName) => {
  const token = await getToken();

  try {
    const response = await apiBaseURL.get(
      `users/verification/email/resend/${userName}`,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getNotifications = async (params) => {
  const token = await getToken();

  const res = await apiBaseURL.get(
    `notification/getAllNotification?limit=${params?.limit || 10}&page=${
      params?.page || 1
    }`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  if (res.status == 200) {
    const dataWithUserDetails = await Promise.all(
      res?.data?.body?.docs &&
        res?.data?.body?.docs.map(async (singleData) => {
          const res =
            singleData && (await getUserInfoByUserId(singleData.senderId));
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
    const data = dataWithUserDetails;
    return data;
  } else {
    return [];
  }
};

export const helpService = async (helpId) => {
  const token = await getToken();
  try {
    const res = await apiBaseURL.get(`admins/help/getHelp/${helpId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const resourceService = async (resourceId) => {
  const token = await getToken();
  try {
    const res = await apiBaseURL.get(
      `admins/resource/getResouce/${resourceId}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const privacySettingToggle = async (getPrivacy) => {
  const token = await getToken();

  try {
    const response = await apiBaseURL.patch(
      `profiles/myProfileUpdates/update/privacy`,
      { privacy: getPrivacy },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getActivityLogsApi = async (params) => {
  const token = await getToken();

  const res =
    params &&
    (await apiBaseURL.get(
      `notification/getAllNotification?limit=${params.limit}&page=${params.page}&activity`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    ));
  // console.log(res, "res")
  if (res.status == 200) {
    const dataWithUserDetails = await Promise.all(
      res?.data?.body?.docs &&
        res?.data?.body?.docs.map(async (singleData) => {
          const res =
            singleData && (await getUserInfoByUserId(singleData.receiverId));
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
    const data = dataWithUserDetails;
    return data;
  } else {
    return [];
  }
};

export const deleteNotificationApi = async (notId) => {
  const token = await getToken();

  const data = { notificationId: notId };
  const res = await apiBaseURL.post(`notification/deleteNotification`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
