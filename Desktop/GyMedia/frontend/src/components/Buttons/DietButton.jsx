import { useState } from "react";
import Recipe from "../../../../backend/models/recipeSchema";
import RecipeDescription from "../Recetas/RecipeDescription";

function DietButton({ diet }) {
  const [modalOn, setModalOn] = useState(false);

  const handleClick = () => {
    setModalOn(true);
  };

  const handleClose = () => {
    setModalOn(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="text-white bg-gradient-to-br from-green-800 to-green-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-auto mr-3"
      >
        Ver receta
      </button>
      {modalOn && (
        <RecipeDescription
          modalOn={modalOn}
          onClose={handleClose}
          diet={diet}
        />
      )}
    </>
  );
}

export default DietButton;
