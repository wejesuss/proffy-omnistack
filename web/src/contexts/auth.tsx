import React, { createContext, useState, useEffect, useContext } from 'react';

import * as auth from '../services/auth';
import { login, logout } from '../utils';

import { User, LoginResultStatus } from '../@types';
import { getSessionUser } from '../utils/session';

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(
    credentials: { email: string; password: string },
    remember: boolean,
  ): Promise<LoginResultStatus>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getSessionUser());
  }, []);

  async function signIn(
    credentials: { email: string; password: string },
    remember: boolean,
  ): Promise<LoginResultStatus> {
    try {
      const res = await auth.signIn(credentials);

      if ('error' in res) {
        throw res.error;
      }

      login({ token: res.token, user: res.user }, remember);
      setUser(res.user);

      return { result: true, error: null };
    } catch (reason) {
      return { result: false, error: reason };
    }
  }

  function signOut() {
    logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within a AuthProvider.');
  }

  return context;
}
