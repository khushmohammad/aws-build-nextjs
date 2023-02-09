import axios from "axios";
// import { getToken } from "./user.service";

export const getToken = async () => {
    // return await axios.get("/api/get-token");
    const token = await axios.get("/api/handler");
    return token.data.token;
};


