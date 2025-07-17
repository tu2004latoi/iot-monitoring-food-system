import axios from "axios";

const BASE_URL = 'http://10.0.2.2:8080/api/';

export const endpoints = {
	login: '/auth/login',
    'current-user': '/secure/profile',
}


export const authApis = (token) =>  {
    return axios.create({
        baseURL: BASE_URL, 
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export default axios.create({
    baseURL: BASE_URL
});