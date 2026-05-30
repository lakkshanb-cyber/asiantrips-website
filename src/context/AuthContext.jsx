import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabaseAuth } from '@/lib/supabaseClient';

const AuthContext = createContext(null);

const sessionToUser = (session) => {
  if (!session?.user) return null;
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.user_metadata?.full_name || session.user.email,
    role: 'admin',
  };
};

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    setAdminUser(sessionToUser(supabaseAuth.getSession()));
    setIsAuthLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    const session = await supabaseAuth.signInWithPassword({ email, password });
    const user = sessionToUser(session);
    setAdminUser(user);
    return { user };
  };

  const logout = async () => {
    await supabaseAuth.signOut();
    setAdminUser(null);
  };

  const value = useMemo(() => ({ adminUser, isAuthenticated: Boolean(adminUser), isAuthLoading, login, logout }), [adminUser, isAuthLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
