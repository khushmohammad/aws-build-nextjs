import { apiBaseURL } from "./defaultAxiosPath";
import { getToken } from "./defaultAxiosPath";

export const getHelpApi = async (params) => {


    const token = await getToken();

    var FormData = require('form-data');
    var data = new FormData();
    data.append('preference', params.preference);
    data.append('secretIdentity', params.secretIdentity);
    data.append('description', params.description);
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'helps/community/createHelp',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: data
    };
    const res = params && await apiBaseURL(config)
    return res




}