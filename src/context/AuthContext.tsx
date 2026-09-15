import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  loginAsDemo: () => void;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { showToast } = useToast();

  // Check if a user was previously logged in.
  // Do NOT create a default/demo user automatically.
  useEffect(() => {
    const savedUser = apiService.getCurrentUser();

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Login
  const login = async (
    email: string,
    pass: string
  ): Promise<boolean> => {
    // Frontend-only authentication simulation
    if (!email || !pass) {
      showToast('Please enter your email and password.', 'error');
      return false;
    }

    const loggedUser: User = {
      id: `usr-${Date.now()}`,
      name: email
        .split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      email,
      phone: '+1 (555) 019-2831',
      address: '124 Blossom Lane',
      city: 'Rosewood',
      postalCode: '90211',
    };

    setUser(loggedUser);
    apiService.saveUser(loggedUser);

    showToast(`Welcome back, ${loggedUser.name}!`, 'success');

    return true;
  };

  // Optional demo login
  const loginAsDemo = () => {
    const demoUser: User = {
      id: 'usr-demo',
      name: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      phone: '+1 (555) 890-1234',
      address: '42 Baker Street',
      city: 'Bloomfield',
      postalCode: '90210',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    };

    setUser(demoUser);
    apiService.saveUser(demoUser);

    showToast('Signed in as Demo User (Eleanor Vance)', 'info');
  };

  // Signup
  const signup = async (
    name: string,
    email: string,
    pass: string
  ): Promise<boolean> => {
    if (!name || !email || !pass) {
      showToast('Please fill in all required fields.', 'error');
      return false;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    };

    setUser(newUser);
    apiService.saveUser(newUser);

    showToast(
      `Account created successfully! Welcome to BakedBloom, ${name}.`,
      'success'
    );

    return true;
  };

  // Logout
  const logout = () => {
    setUser(null);
    apiService.saveUser(null);

    showToast('You have been logged out.', 'info');
  };

  // Update profile
  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);
    apiService.saveUser(updatedUser);

    showToast('Profile updated successfully!', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
