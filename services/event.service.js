import axios from "axios";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const createEventService = async (data) => {
  const token = await getToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/events/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
