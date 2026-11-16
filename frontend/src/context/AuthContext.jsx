import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load initial user from localStorage or default to Citizen for preview
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('civilrecord_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached user', e);
      }
    }
    // Default preview user: Citizen
    return INITIAL_USERS[3]; // Anisa Rahmawati (citizen)
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('civilrecord_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse users', e);
      }
    }
    return INITIAL_USERS;
  });

  useEffect(() => {
    localStorage.setItem('civilrecord_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('civilrecord_users', JSON.stringify(users));
  }, [users]);

  // Login handler
  const login = (email, password) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    return { success: false, message: 'Email atau password tidak cocok.' };
  };

  // Quick switch role for testing demo seamlessly
  const switchRole = (role) => {
    const targetUser = users.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  // Switch specific user by id
  const switchUserById = (userId) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
    }
  };

  const logout = () => {
    // Return to guest or keep citizen
    const citizen = users.find((u) => u.role === 'citizen') || INITIAL_USERS[3];
    setCurrentUser(citizen);
  };

  const register = ({ name, email, phone, password }) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: 'Email sudah terdaftar.' };
    }

    const newUser = {
      id: `usr-citizen-${Date.now()}`,
      name,
      email,
      phone: phone || '08xx-xxxx-xxxx',
      role: 'citizen',
      department: 'Masyarakat Umum',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
    };

    const updated = [...users, newUser];
    setUsers(updated);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
        register,
        switchRole,
        switchUserById,
        isAdmin: currentUser?.role === 'admin',
        isOfficer: currentUser?.role === 'officer',
        isCitizen: currentUser?.role === 'citizen'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

