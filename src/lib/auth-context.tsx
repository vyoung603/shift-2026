"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const AUTH_KEY = "shift_authenticated";

type AuthCtx = {
  authed: boolean;
  checkCode: (input: string, correctCode: string) => boolean;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthCtx>({
  authed: false, checkCode: () => false, logout: () => {}, loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthed(localStorage.getItem(AUTH_KEY) === "true");
    setLoading(false);
  }, []);

  const checkCode = (input: string, correctCode: string) => {
    if (input.toLowerCase().trim() === correctCode.toLowerCase().trim()) {
      setAuthed(true);
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthed(false);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ authed, checkCode, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
