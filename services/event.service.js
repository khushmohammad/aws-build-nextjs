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
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllEvents = async (eventType) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/events/user/${eventType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const getEventByEventId = async (eventid) => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/events/info/${eventid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

export const eventActionService = async (action, id) => {
  const token = await getToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PATH}/events/user/eventAction/${action}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEventService = async (eventId) => {
  const token = await getToken();
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}/events/user/eventAction/deleteEvent/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("::", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
