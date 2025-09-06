import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  subscribe: (plan: 'premium') => Promise<boolean>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('dailybrief_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Check if premium subscription is still valid
      if (userData.isPremium && userData.subscriptionExpiry) {
        const isExpired = new Date(userData.subscriptionExpiry) < new Date();
        if (isExpired) {
          userData.isPremium = false;
          userData.subscriptionExpiry = undefined;
        }
      }
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: Date.now().toString(),
        email,
        isPremium: false
      };
      
      setUser(userData);
      localStorage.setItem('dailybrief_user', JSON.stringify(userData));
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dailybrief_user');
  };

  const subscribe = async (plan: 'premium'): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedUser: User = {
        ...user,
        isPremium: true,
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      };
      
      setUser(updatedUser);
      localStorage.setItem('dailybrief_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    login,
    logout,
    subscribe,
    isLoading
  };
};