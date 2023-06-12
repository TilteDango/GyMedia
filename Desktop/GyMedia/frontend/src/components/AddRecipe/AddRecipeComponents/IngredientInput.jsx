import React from "react";
import { useState, useEffect } from "react";

export default function IngredientInput({ handleUpdating, updating }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unity, setUnity] = useState("Gramo(s)");

  useEffect(() => {
    if (updating) {
      const fetchData = async () => {
        const ingredient = { name, quantity, unity };
        await handleUpdating(ingredient);
      };

      fetchData();
    }
  }, [updating]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUnityChange = (e) => {
    setUnity(e.target.value);
  };

  return (
    <>
      <div className="flex my-2">
        <div className="w-2/4 mr-2">
          <input
            type="text"
            id="ingredient_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Pechuga de pollo"
            required
            onChange={handleNameChange}
          />
        </div>
        <div className="w-1/4 mr-2">
          <input
            type="text"
            id="ingredient_quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="1200"
            required
            onChange={handleQuantityChange}
          />
        </div>
        <div className="w-1/4">
          <select
            id="ingredient_unity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleUnityChange}
          >
            <option>Gramo(s)</option>
            <option>Kilogramo(s)</option>
            <option>Cucharada(s)</option>
            <option>Unidad(es)</option>
            <option>Litro(s)</option>
            <option>Puñado(s)</option>
            <option>Taza(s)</option>
          </select>
        </div>
      </div>
    </>
  );
}
