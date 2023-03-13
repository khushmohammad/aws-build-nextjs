import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";




export const getMesasgesByreceiverId = async (receiverUserId) => {
    const token = await getToken();

    try {
        const res = await apiBaseURL.get(
            `chats/messages/${receiverUserId}?pageNumber=1&limit=30`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res
        //return res.data.body;
    } catch (err) {
        console.log(err);
    }
};

