import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const BASE_URL = 'http://localhost:8080/api/';

export const endpoints = {
	login: '/auth/login',
	products: '/products',
	productAdd: '/products/add',

}

export const authApis = async () => {
	const token = await AsyncStorage.getItem('token');
	if (!token) {
		console.error("Token không tồn tại");
		throw new Error("Token không tồn tại");
	}
	return axios.create({
		baseURL: BASE_URL,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})

}

export default axios.create({
	baseURL: BASE_URL
});
