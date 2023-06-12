import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { RecipeContext } from "../../Context/RecipeContext";
import LoginForm from "../NavBar/LogIn/LogInForm";

function MgButtonInside({ _id, isLiked }) {
  const [liked, setLiked] = useState(isLiked);
  const { token, setToken } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const { refreshRecipe } = useContext(RecipeContext);
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

  const color = liked ? "currentColor" : "none";
  const text = !liked ? "¡No me gusta!" : "Me gusta";
  const cssnme = liked ? "h-6 w-6 text-white" : "h-6 w-6 text-black";
  return (
    <>
      <button className="mx-1" onClick={handleClick}>
        <span
          className="inline-flex items-center rounded-full p-2 bg-pink-500 text-white group transition-all duration-500 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none"
          role="alert"
          tabIndex="0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={color}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
            {text}
          </span>
        </span>
      </button>
      {modal && <LoginForm onClose={onClose} />}
    </>
  );
}

export default MgButtonInside;
