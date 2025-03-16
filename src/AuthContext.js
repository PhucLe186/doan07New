import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:5000/auth/check', { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null));
    }, []);

    const Login = async (email, password) => {
        try {
            const res = await axios.post(
                'http://localhost:5000/auth/login',
                { email, password },
                { withCredentials: true },
            );
            setUser(res.data.user);
        } catch (error) {
            alert(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    };

    const logout = async () => {
        await axios.post('http://localhost:5000/auth/logout', { withCredentials: true });
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, Login, logout }}>{children}</AuthContext.Provider>;
};
