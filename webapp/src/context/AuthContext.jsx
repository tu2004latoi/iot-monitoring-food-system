import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import APIs, { authApis, endpoints } from "../api/Apis";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(localStorage.getItem('token') || null);
	const navigate = useNavigate();

	// Kiểm tra token khi load app
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const api = await authApis();
				const res = await api.get(endpoints.profile);
				console.log("STATUS:", res.status);
				console.log("DATA:", res.data);
				setUser(res.data); // ✅ Đặt user ở đây
			} catch (err) {
				console.error("ERR", err.response?.data || err.message);
				logout(); // Đăng xuất nếu token sai hoặc hết hạn
			}
		};

		if (token || !user) {
			fetchProfile();
		}
	}, [token]);

	const login = async (credentials) => {

		const response = await APIs.post(endpoints.login,
			credentials,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		setToken(response.data.token);
		localStorage.setItem('token', response.data.token);
		const api = await authApis(); // gắn token
		const profileRes = await api.get(endpoints.profile);
		setUser(profileRes.data); // cập nhật user
		navigate('/');
	}


	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
