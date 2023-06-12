import React from "react";

export default function Persons({ handleInputChange }) {
  const handleLessClick = () => {
    const person = document.getElementById("Quantity");
    if (parseInt(person.value) > 1) {
      person.value = parseInt(person.value) - 1;
    }
  };

  const handlePlusClick = () => {
    const person = document.getElementById("Quantity");
    person.value = parseInt(person.value) + 1;
  };

  return (
    <div className="flex">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {" "}
        Ración(es){" "}
      </label>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
          onClick={handleLessClick}
        >
          &minus;
        </button>

        <input
          type="number"
          id="Quantity"
          value="4"
          className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          onChange={handleInputChange}
        />

        <button
          type="button"
          className="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
          onClick={handlePlusClick}
        >
          +
        </button>
      </div>
    </div>
  );
}
