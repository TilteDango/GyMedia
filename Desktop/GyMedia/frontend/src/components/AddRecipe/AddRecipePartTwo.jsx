import React from "react";
import { useState, useEffect } from "react";
import UserImage from "./AddRecipeComponents/UserImage";
import AddInput from "./AddRecipeComponents/AddInput";
import LabelInput from "./AddRecipeComponents/LabelInput";
import CreateRecipe from "../Buttons/CreateRecipe";

export default function AddRecipePartTwo({
  modalOn,
  onClose,
  updateFormData,
  updatePart,
  recipeName,
}) {
  const [modal, setModal] = useState(true);
  const [ingredients, setIngredients] = useState([{}]);
  const [update, setUpdate] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleUpdating = (newIngredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  };

  useEffect(() => {
    handleUpdate();
  }, [ingredients]);

  useEffect(() => {
    if (update) {
      handleUpdate();
      setUpdate(false);
    }
  }, [update]);

  const handleCancelClic = () => {
    setModal(!modal);
    onClose();
  };

  const handleUpdate = async () => {
    if (!isRemoved) {
      setIngredients(ingredients.slice(1));
      setIsRemoved(true);
    }

    await updateFormData(ingredients);
    if (update) {
      setIsClicked(true);
    }

    if (isClicked) {
      await updatePart();
    }
  };

  const handleSubmitClic = () => {
    setUpdate(true);
  };

  return (
    <div
      className={
        modal
          ? "flex overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 justify-center items-center z-50 backdrop-blur"
          : "fixed top-0 left-0 w-full h-full justify-center items-start bg-gray-500 bg-opacity-50 z-50 hidden"
      }
      aria-hidden="true"
    >
      <div className="relative py-3 sm:mx-auto sm:max-w-xl w-3/4 ">
        <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-green-800 to-light-green-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
        <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20 overflow-y-auto max-h-screen">
          <div className="mx-auto max-w-md">
            <UserImage onclick={handleCancelClic} />
            <div className="divide-y divide-gray-200">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900  my-3"
              >
                {recipeName}
              </label>
              <div className="my-4">
                <LabelInput />
                <AddInput handleUpdating={handleUpdating} updating={update} />
                <CreateRecipe handleClick={handleSubmitClic}>
                  Introducir ingredientes
                </CreateRecipe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
