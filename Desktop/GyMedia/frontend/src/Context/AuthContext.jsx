import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const getUserByToken = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:6001/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      }).then((res) => {
        return res.json();
      });

      return response;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, getUserByToken }}>
      {children}
    </AuthContext.Provider>
  );
}
