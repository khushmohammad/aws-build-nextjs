import axios from "axios";
import { getUserInfoByUserId } from "./posts.service";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getAllfriendRequest = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/friendRequest/getAll`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status == 200) {
      const friendRequestslist = await response?.data?.body;

      const newarray = await Promise.all(
        friendRequestslist.map(async (friendRequestData) => {
          const res = await getUserInfoByUserId(friendRequestData.userId);
          const userData = await res?.data?.body;
          const newdata = await {
            ...friendRequestData,
            friendRequestBy: userData,
          };
          return newdata;
        })
      );

      return newarray;
    }
  } catch (err) {
    return err;
  }
};

export const AcceptAndRejectfriendRequest = async (reqId, requestStatus) => {
  const token = await getToken();
  const payloadData = { _id: reqId };
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/friendRequest/pendingRequestAction/${requestStatus}`,
      payloadData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200) {
      return true;
      // const friendRequestslist = await response?.data?.body

      // const newarray = await Promise.all(
      //     friendRequestslist.map(async (friendRequestData) => {
      //         const res = await getUserInfoByUserId(friendRequestData.userId);
      //         const userData = await res?.data?.body;
      //         //console.log(userData);
      //         const newdata = await { ...friendRequestData, friendRequestBy: userData }
      //         return newdata
      //     })
      // )

      // return newarray;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
};

export const SendAndCancelFriendRequest = async (userId, status) => {
  const token = await getToken();
  const payloadData = { friendId: userId };
  try {
    const ApiUrl =
      status === "request"
        ? "friendRequest/sendRequest"
        : "friend/cancelRequest";
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/${ApiUrl}`,
      payloadData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 200) {
      return true;
      // const friendRequestslist = await response?.data?.body

      // const newarray = await Promise.all(
      //     friendRequestslist.map(async (friendRequestData) => {
      //         const res = await getUserInfoByUserId(friendRequestData.userId);
      //         const userData = await res?.data?.body;
      //         //console.log(userData);
      //         const newdata = await { ...friendRequestData, friendRequestBy: userData }
      //         return newdata
      //     })
      // )

      // return newarray;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
};

export const getFriendListWithUserData = async (friendsArr) => {
  //console.log(friendsArr, "friendsArr");
  const token = await getToken();

  const payloadData = { userId: friendsArr };
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/userProfile/byUserIds`,
      payloadData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = await response?.data?.body;
    return await userData;
    //console.log(userData, "response");
  } catch (err) {
    console.log(err);
  }

  // if (friendsArr.length != 0) {
  //     const newarray = await Promise.all(
  //         friendsArr.map(async (userId) => {
  //             const res = await getUserInfoByUserId(userId);
  //             const userData = await res?.data?.body;
  //             //console.log(userData);
  //             const newdata = await userData?.userInfo
  //             return newdata
  //         })
  //     )
  //     // console.log(newarray, "newarray");
  //     return newarray;
  // }
};

// new friendlist api

export const getFriendList = async (limit = 10, pageNumber = 1) => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myFriends?${limit}&${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status == 200) {
    return res.data.body;
  } else {
    return [];
  }
};

export const getNonFriendList = async (pageNumber = 1, limit = 10) => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/friend/nonFriend`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status == 200) {
    return res.data.body;
  } else {
    return [];
  }

};

export const friendsBirthdayList = async () => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/friends/birthdays`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data?.body;
  } catch (error) {
    console.log(error);
  }
};


export const getPendingRequestFriendListApi = async () => {
  const token = await getToken();

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/friend/pendingRequestByUserId`, "",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res

};


