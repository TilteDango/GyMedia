import React from "react";

export default function Category({ name, onUserUpdate }) {
  const handleInputChange = (e) => {
    onUserUpdate(name, e.target.value);
  };
  return (
    <div className="mb-6">
      <label
        htmlFor="gategory"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Selecciona una categoria*
      </label>
      <select
        id="category"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={handleInputChange}
      >
        <option>--Seleccione la categoria que mas se adecue--</option>
        <option>Arroz</option>
        <option>Batido</option>
        <option>Cerdo</option>
        <option>Desayuno</option>
        <option>Ensalada</option>
        <option>Guiso</option>
        <option>Helado</option>
        <option>Macedonia</option>
        <option>Pasta</option>
        <option>Pastel</option>
        <option>Pescado</option>
        <option>Pollo</option>
        <option>Ternera</option>
        <option>Vegano</option>
        <option>Verdura</option>
      </select>
    </div>
  );
}
