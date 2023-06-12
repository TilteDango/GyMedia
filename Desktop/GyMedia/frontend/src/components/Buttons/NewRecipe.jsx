import React from "react";
import { useState } from "react";
import FormAddRecipe from "../AddRecipe/FormAddRecipe";

export default function NewRecipe() {
  const [modalOn, setModalOn] = useState(false);
  const [isValidForm, setIsValidForm] = useState(true);

  const handleClose = () => {
    setModalOn(false);
  };

  const handleClick = () => {
    setModalOn(true);
  };

  return (
    <>
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        + Receta
      </button>
      {!isValidForm && (
        <div
          className="font-regular relative block w-1/6 rounded-lg bg-red-400 p-4 text-base leading-5 text-white opacity-100"
          style={{ position: "absolute", top: 15, right: 15 }}
        >
          La receta no se pudo crear, rellene los campos pertinentes
        </div>
      )}
      {modalOn && (
        <FormAddRecipe
          modalOn={modalOn}
          onClose={handleClose}
          setIsValidForm={setIsValidForm}
        />
      )}
    </>
  );
}
