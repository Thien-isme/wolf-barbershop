import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import type { UserDTO } from '../types/ResponseDTOs/userDTO';
interface AuthContextType {
    login: UserDTO | null;
    setLogin: (login: UserDTO | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [login, setLogin] = useState<UserDTO | null>(() => {
        // Khởi tạo state từ localStorage nếu có
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user) as UserDTO;
        }
        return null;
    });

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');
        setLogin(null);
    };

    return (
        <AuthContext.Provider value={{ login, setLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
