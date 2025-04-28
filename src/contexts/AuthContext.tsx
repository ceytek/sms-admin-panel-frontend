import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserWithoutPassword, LoginCredentials } from '../types/auth.types';
import { authService } from '../services/auth.service';
import { message } from 'antd';

interface AuthContextType {
  user: UserWithoutPassword | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sayfa yüklendiğinde token kontrolü ve kullanıcı bilgilerini getirme
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            // Kullanıcı bilgileri alınamazsa token'ı temizle
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);

      if (response.error) {
        message.error(response.error);
        return false;
      }

      if (response.user) {
        setUser(response.user);
        message.success('Giriş başarılı');
        return true;
      }

      return false;
    } catch (error) {
      message.error('Giriş işlemi başarısız oldu');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    message.success('Çıkış yapıldı');
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  if (isLoading) {
    return null; // veya bir loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 