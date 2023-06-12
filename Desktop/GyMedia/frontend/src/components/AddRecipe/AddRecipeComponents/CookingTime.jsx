import React from "react";

export default function CookingTime({ name, onUserUpdate }) {
  const handleInputChange = (e) => {
    onUserUpdate(name, e.target.value);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="number"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Tiempo de cocción (en minutos)
      </label>
      <input
        type="number"
        id="number"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        min="0"
        onChange={handleInputChange}
      />
    </div>
  );
}
