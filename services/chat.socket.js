import axios from "axios";
// import { getToken } from "./user.service";

export const getToken = async () => {
    // return await axios.get("/api/get-token");
    const token = await axios.get("/api/handler");
    return token.data.token;
};




export const getMesasgesByreceiverId = async (receiverUserId) => {
    const token = await getToken();

    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_PATH}/chats/messages/${receiverUserId}?pageNumber=1&limit=30`,
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

