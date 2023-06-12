import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { RecipeContext } from "../../Context/RecipeContext";
import LogInForm from "../NavBar/LogIn/LogInForm";

function MgButton({ _id, isLiked }) {
  const [liked, setLiked] = useState(isLiked);
  const { token, setToken } = useContext(AuthContext);
  const { refreshRecipe } = useContext(RecipeContext);
  const [modal, setModal] = useState(false);

  const handleClick = async () => {
    if (token != null) {
      setLiked(!liked);
      const newAction = {
        token: token,
        like: !liked,
        recipeID: _id,
      };
      const response = await fetch("http://127.0.0.1:6001/api/recipes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Connection: "keep-alive",
        },
        body: JSON.stringify(newAction),
      });
      refreshRecipe();
    } else {
      setModal(true);
    }
  };

  const onClose = () => {
    setModal(false);
  };
  const cssnme = liked ? "h-5 w-5 text-pink-500" : "h-5 w-5";
  return (
    <>
      <button onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cssnme}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {modal && <LogInForm onClose={onClose} />}
    </>
  );
}

export default MgButton;
