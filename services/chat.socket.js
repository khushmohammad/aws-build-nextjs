import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";

export const getMesasgesByreceiverId = async (typeObj, page = 1, limit = 5) => {
  const token = await getToken();

  const apiPath = `chats/messages?groupId=${typeObj.groupId || ""}&receiverId=${
    typeObj.receiverId || ""
  }&helpId=${typeObj.helpId || ""}`;

  const res = await apiBaseURL.get(
    `${apiPath}&pageNumber=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res;
};

export const checkUserTypeForChat = async (id) => {
  const token = await getToken();

  const apiPath = `chats/conversation/checkChatType/${id}`;

  const res = await apiBaseURL.get(`${apiPath}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const AcceptHelp = async (routeId) => {
  const token = await getToken();

  const apiPath = `chats/community/helpingUser`;

  const formData = { secretIdentity: false, helpId: routeId };

  const res = await apiBaseURL.post(`${apiPath}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
