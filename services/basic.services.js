import axios from "axios";
// import { getToken } from "./user.service";

export const getToken = async () => {
    // return await axios.get("/api/get-token");
    const token = await axios.get("/api/handler");
    return token.data.token;
};



export const countriesList = async (inputValue) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/users/country/all/${inputValue}`
    );
    const countri = await res.data.body;
    let newArrayOBj1 = [];
    countri.forEach((element) => {
        const data = { value: element.id, label: element.name };
        return newArrayOBj1.push(data);
    });

    return newArrayOBj1;
};

export const getMaritalStatus = async () => {
    const token = await getToken();

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/profiles/dropdowns/values/MaritalStatus`,
        {
            headers: { authorization: `Bearer ${token}` },
        }
    );
    const data = await res.data

    return data;
};


export const getNotifications = async () => {
    const token = await getToken();

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/profiles/dropdowns/values/MaritalStatus`,
        {
            headers: { authorization: `Bearer ${token}` },
        }
    );
    const data = await res.data

    return data;
};


// export const clearEmpties = (obj) => {
//     for (var propName in obj) {
//         if (typeof obj[propName] == "object")
//             clearEmpties(obj[propName])
//         if (obj[propName] === '' || obj[propName] === '')
//             delete obj[propName];
//     }
// }