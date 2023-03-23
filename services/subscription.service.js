import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";

export const getAllSubscriptionPlansService = async () => {
  const token = await getToken();

  try {
    const { data } = await apiBaseURL.get("admins/subscription/getAll", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data.body;
  } catch (err) {
    console.log(err);
  }
};
