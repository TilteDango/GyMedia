import React, { useState } from "react";

export default function ICMCalculator() {
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [imc, setIMC] = useState(0);

  const handleAlturaChange = (event) => {
    setAltura(event.target.value);
  };

  const handlePesoChange = (event) => {
    setPeso(event.target.value);
  };

  const handleCalcClick = () => {
    const newIMC = peso / ((altura / 100) * (altura / 100));
    setIMC(newIMC);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">
        Calculadora de IMC
      </h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="altura">
          Introduzca su altura
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="altura"
          type="number"
          placeholder="Altura (cm)"
          value={altura}
          onChange={handleAlturaChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="peso">
          Introduzca su peso
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="peso"
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={handlePesoChange}
        />
      </div>
      <div>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCalcClick}
        >
          Calcular
        </button>
      </div>
      <div className="text-center mt-4">
        {imc !== 0 && <p>Su IMC es: {imc.toFixed(2)}</p>}
      </div>
    </div>
  );
}
