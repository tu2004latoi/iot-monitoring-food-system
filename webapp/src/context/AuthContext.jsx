import {createContext, useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import APIs, { endpoints } from "../api/Apis";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const navigate = useNavigate();

    // Kiểm tra token khi load app
    useEffect(() => {
        if (token) {
            // Gọi API /me để lấy thông tin user (nếu cần)
            // setUser(response.data);
        }
    }, [token]);

    const login = async (credentials) => {
        try {
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
            navigate('/');
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
