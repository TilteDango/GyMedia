import React from "react";
import { useState, useEffect, useContext } from "react";
import DietCard from "./DietCard";
import { AuthContext } from "../../Context/AuthContext";
import { RecipeContext } from "../../Context/RecipeContext";

export function DietList({ active }) {
  const [dietas, setDietas] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const { recipeCont, refreshRecipe } = useContext(RecipeContext);

  async function getRecipes(token, active) {
    const newAction = {
      token: token,
      active: active,
    };
    const recipes = await fetch(`http://127.0.0.1:6001/api/recipes/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAction),
    }).then((res) => {
      return res.json();
    });
    return recipes;
  }

  useEffect(() => {
    async function getData() {
      const recipes = await getRecipes(token, active);
      setDietas(recipes);
    }

    getData();
  }, [recipeCont]);

  const cssname = active ? "w-4/5 py-1" : "w-4/5 py-1 m-auto";

  return (
    <div className={cssname}>
      {dietas.map((dieta) => (
        <div key={dieta._id}>
          <DietCard dieta={dieta} />
        </div>
      ))}
    </div>
  );
}
