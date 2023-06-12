import { useState } from "react";
import IngredientInput from "./IngredientInput";

function AddInput({ handleUpdating, updating }) {
  const [inputCount, setInputCount] = useState(2);
  const handleClick = () => {
    setInputCount(inputCount + 1);
  };

  const inputArray = [];

  for (let i = 0; i < inputCount; i++) {
    inputArray.push(
      <IngredientInput
        key={i}
        handleUpdating={handleUpdating}
        updating={updating}
      />
    );
  }

  return (
    <>
      {inputArray}
      <button
        type="button"
        className="text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
        onClick={handleClick}
        id="focused-button"
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>

        <span className="sr-only">Add Ingredient</span>
      </button>
    </>
  );
}

export default AddInput;
