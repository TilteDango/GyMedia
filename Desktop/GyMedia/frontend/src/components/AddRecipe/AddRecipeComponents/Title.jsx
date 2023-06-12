import React from "react";

export default function Title({ onUserUpdate, name }) {
  const handleInputChange = (e) => {
    onUserUpdate(name, e.target.value);
  };
  return (
    <div className="mb-6">
      <label
        htmlFor="base-input"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Titulo*
      </label>
      <input
        type="text"
        id="base-input"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Esribe el titulo de su receta"
        required
        onChange={handleInputChange}
      />
    </div>
  );
}
