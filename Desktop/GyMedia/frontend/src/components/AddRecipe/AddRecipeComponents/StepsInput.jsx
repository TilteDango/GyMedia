import React from "react";
import { useState, useEffect } from "react";

export default function StepsInput({ handleUpdating, updating, stepNumber }) {
  const [step, setStep] = useState("");

  useEffect(() => {
    if (updating) {
      handleUpdating(step);
    }
  }, [updating]);

  const handleChange = (e) => {
    setStep(e.target.value);
  };

  return (
    <>
      <div className="my-2">
        <label htmlFor={`steps${stepNumber}`}>Paso {stepNumber}</label>
        <textarea
          name={`steps${stepNumber}`}
          id={`steps${stepNumber}`}
          cols="60"
          rows="6"
          className="block mb-2 text-sm font-medium text-gray-900 w-auto border-black border"
          onChange={handleChange}
        ></textarea>
      </div>
    </>
  );
}
