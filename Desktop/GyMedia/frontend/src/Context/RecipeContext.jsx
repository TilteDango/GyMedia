import React, { createContext, useState } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipeCont, setRecipe] = useState(0);

  const refreshRecipe = () => {
    setRecipe((prev) => prev + 1)
  }

  const deleteRecipe = async (recipe) => {
    try {
      const response = await fetch("http://127.0.0.1:6001/api/recipes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      refreshRecipe();
      return response
    } catch (error) {
      console.log(error);
      return false
    }

   
  }

  return (
    <RecipeContext.Provider value={{ recipeCont, refreshRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}