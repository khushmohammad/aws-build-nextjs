import axios from "axios";

export const getToken = async () => {
  const token = await axios.get("/api/handler");
  return token.data.token;
};

export const getUserList = async (page = 1, limit = 2) => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/userProfile?${limit}&${page}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return res.data.body;
};

export const getUserById = async (id) => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfile/${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return res.data.body;
};

export const getCitiesByStateId = async (id) => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/cities/all/citiesByStateId?limit&page&state_id=${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  // const states = await res.data.body;
  return res.data.body;
};

export const getStatesByCountryId = async (id) => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/states/all/statesByCountryId?limit&page&country_id=${id}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  // const states = await res.data.body;
  return res.data.body;
};

export const getStateData = async (countryId = "", inputValue = "") => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/states/all/${countryId}/?stateName=${inputValue}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  // const states = await res.data.body;
  const state = await res?.data?.body;

  let stateDropDownOptions = [];
  state.forEach((element) => {
    const data = { value: element.id, label: element.name };
    return stateDropDownOptions.push(data);
  });

  return stateDropDownOptions;
};
export const getCityData = async (stateId = "", inputValue = "") => {
  const token = await getToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/cities/all/${stateId}/?cityName=${inputValue}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  const city = await res?.data?.body;

  let cityDropDownOptions = [];
  city.forEach((element) => {
    const data = { value: element.id, label: element.name };
    return cityDropDownOptions.push(data);
  });

  return cityDropDownOptions;
};

export const getCountryData = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all`
  );
  return res.data.body;
};

export const getAllPhotos = async () => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfile/profile/images`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGaleryImage = async (fileId, data) => {
  console.log(fileId, data);
  const token = await getToken();
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/gallery/delete/Image/${fileId}`,
      {
        headers: { authorization: `Bearer ${token}` },
      },
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchMemberByFullName = async (input = "") => {
  const token = await getToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_PATH}/profiles/userProfile/usersInfo?fullName=${input}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return res.data.body;
  } catch (error) {
    console.log(error);
  }
};

export const getIcSocialMediaInfo = async (formData) => {
  const token = await getToken();

  const socialMediaForm = { socialMedia: formData };

  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/integratingCoach/socialMedia`,
    socialMediaForm,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const profileDeactivation = async (data) => {
  const token = await getToken();

  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfileUpdates/update/profileActivation`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const removeFriendFromFriendList = async (friendId) => {
  const token = await getToken();

  // console.log(friendId)
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myFriends/removeFriend/${friendId}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  return res;
};

export const profileDelete = async (data) => {
  const token = await getToken();

  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/myProfileUpdates/update/profileDeletion`,
    data,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};

export const getFlagStatus = async () => {
  const token = await getToken();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PATH}/profiles/flags/getFlagStatus`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
};
