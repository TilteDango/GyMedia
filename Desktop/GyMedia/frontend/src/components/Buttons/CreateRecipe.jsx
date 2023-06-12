import React from "react";

export default function CreateRecipe({ handleClick, children }) {
  return (
    <div className="mb-6 flex justify-center">
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
}
