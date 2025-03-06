import { createContext, useState, useEffect } from 'react';
import { auth, database } from './firebase'; // Import Firebase
import { ref, get } from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lắng nghe trạng thái đăng nhập của Firebase Auth
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                // Nếu đã đăng nhập, lấy dữ liệu user từ Firebase Database
                const userRef = ref(database, `khachhang/${authUser.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUser({ uid: authUser.uid, ...snapshot.val() }); // Lưu thông tin user vào state
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Hàm đăng xuất
    const logout = async () => {
        await signOut(auth);
    };

    return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
};
