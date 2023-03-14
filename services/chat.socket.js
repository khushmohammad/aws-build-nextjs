import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";

export const getMesasgesByreceiverId = async (chatId) => {
  const token = await getToken();

  const apiPath = `chats/messages?receiverId=${chatId}`;
  // const apiPath = `chats/messages?groupId=${chatId}&receiverId=${chatId}`

  try {
    const res = await apiBaseURL.get(`${apiPath}&pageNumber=1&limit=30`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
    //return res.data.body;
  } catch (err) {
    console.log(err);
  }
};
