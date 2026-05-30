import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ADMIN_DEMO_USER } from '@/lib/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem('asiantrips_admin_user');
    if (saved) setAdminUser(JSON.parse(saved));
  }, []);

  const login = async ({ email, password }) => {
    if (email === ADMIN_DEMO_USER.email && password === ADMIN_DEMO_USER.password) {
      const user = { email, name: ADMIN_DEMO_USER.name, role: 'admin' };
      window.localStorage.setItem('asiantrips_admin_user', JSON.stringify(user));
      setAdminUser(user);
      return { user };
    }
    throw new Error('Invalid demo credentials. Use the email and password shown on this page.');
  };

  const logout = () => {
    window.localStorage.removeItem('asiantrips_admin_user');
    setAdminUser(null);
  };

  const value = useMemo(() => ({ adminUser, isAuthenticated: Boolean(adminUser), login, logout }), [adminUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
