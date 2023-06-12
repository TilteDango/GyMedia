import React from "react";

export default function HeaderImage({ onUserUpdate, appendFormData }) {
  const handleOnChange = (e) => {
    onUserUpdate(e);
    appendFormData(e);
  };
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="user_avatar"
      >
        Imagen de cabecera
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
        aria-describedby="user_avatar_help"
        id="user_avatar"
        type="file"
        onChange={handleOnChange}
      />
      <div className="mt-1 text-sm text-gray-500" id="user_avatar_help">
        Una buena forma de enseñar la buena pinta de tus recetas
      </div>
    </div>
  );
}
