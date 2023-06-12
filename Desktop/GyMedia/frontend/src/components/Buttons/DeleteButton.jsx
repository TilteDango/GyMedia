import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { RecipeContext } from "../../Context/RecipeContext";
import DeleteModal from "../Recetas/DeleteModal";

export default function DeleteButton({ id, created }) {
  const { token } = useContext(AuthContext);
  const [modalOn, setModalOn] = useState(false);
  const { deleteRecipe } = useContext(RecipeContext);

  const handleDeleteClick = async () => {
    const deletedRecipe = {
      token,
      recipeID: id,
    }

    const response = deleteRecipe(deletedRecipe);

    if (!response) {
      setModalOn(false);
    }
  };

  const handleClick = async () => {
    setModalOn(true);
  };

  const changeModalOn = () => {
    setModalOn(false);
  };

  return (
    <>
      {created ? (
        <>
          <button onClick={handleClick}>
            <span
              className="inline-flex items-center rounded-full p-2 bg-red-500 text-white group transition-all duration-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              role="alert"
              tabIndex="0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>

              <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
                Borrar receta
              </span>
            </span>
          </button>
          {modalOn && (
            <DeleteModal
              handleDeleteClick={handleDeleteClick}
              modalOn={modalOn}
              changeModalOn={changeModalOn}
            />
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
}
