import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [recipeCont, setRecipe] = useState(0);
  const [selectedUser, setSelectedUser] = useState("");

  const refreshRecipe = () => {
    setRecipe((prev) => prev + 1);
  };
  const getUserInfo = async (userId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:6001/api/user/getInfo/" + userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        getUserInfo,
        recipeCont,
        refreshRecipe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
