import axios from "axios";

export const apiBaseURL = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_PATH}/`
});

export const getToken = async () => {
    // return await axios.get("/api/get-token");
    const token = await axios.get("/api/handler");
    return token.data.token;
  };