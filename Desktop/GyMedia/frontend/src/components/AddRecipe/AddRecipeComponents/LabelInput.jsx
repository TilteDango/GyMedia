import React from "react";

export default function LabelInput() {
  return (
    <div className="flex justify-between my-2 mt-3">
      <label
        htmlFor="base-input"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Ingrediente
      </label>

      <label
        htmlFor="base-input"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Cantidad
      </label>

      <label
        htmlFor="gategory"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        Unidad
      </label>
    </div>
  );
}
