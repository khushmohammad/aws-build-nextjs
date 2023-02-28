import axios from "axios";
import { getUserInfoByUserId, mergeUserBasicDetails } from "./posts.service";
// import { getToken } from "./user.service";

export const getToken = async () => {
  // return await axios.get("/api/get-token");
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const countriesList = async (inputValue) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all/${inputValue}`
  );
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

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/dropdowns/values/MaritalStatus`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/users/verification/email/resend/${userName}`,

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

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/notification/getAllNotification?limit=${params.limit}&page=${params.page}`,
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
    const data = dataWithUserDetails;;
    return data;
  } else {
    return [];
  }
};

export const helpService = async (helpId) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/admins/help/getHelp/${helpId}`,
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
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfileUpdates/update/privacy`,
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

  const res = params && await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/notification/getAllNotification?limit=${params.limit}&page=${params.page}&activity`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
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
    const data = dataWithUserDetails;;
    return data;
  } else {
    return [];
  }
};
