// Minimal Auth Context for RBAC, you can expand as needed
import React, { createContext, useContext } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext<{user:any}|null>(null);

export function AuthProvider({children}:{children:any}) {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) { try { user = jwt_decode(token); } catch {} }
  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext)!; }