import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";

export const systemResource = async (action) => {
  const token = await getToken();
  try {
    const res = await apiBaseURL.post(
      `/admins/system/resource/action`,
      action,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};
