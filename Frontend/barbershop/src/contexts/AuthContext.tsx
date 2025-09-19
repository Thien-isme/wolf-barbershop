import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { LoginResponseDTO } from '../types/ResponseDTOs/loginResponseDTO';

interface AuthContextType {
  login: LoginResponseDTO | null;
  setLogin: (login: LoginResponseDTO | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [login, setLogin] = useState<LoginResponseDTO | null>(() => {
    // Khởi tạo state từ localStorage nếu có
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user) as LoginResponseDTO;
    }
    return null;
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
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