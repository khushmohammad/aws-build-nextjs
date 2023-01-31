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
