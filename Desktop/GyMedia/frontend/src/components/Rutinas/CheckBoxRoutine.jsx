import React, { useState } from "react";
import Video from "./Video";

export default function CheckBoxRoutine({ exercice }) {
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(!modal);
  };
  return (
    <li>
      <input
        type="checkbox"
        id={exercice._id}
        value={exercice._id}
        className="hidden peer"
        required=""
      />
      <label
        htmlFor={exercice._id}
        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-orange-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
      >
        <div className="flex flex-col items-center w-full">
          <img
            src={exercice.header}
            alt="Cabecera de ejercicio"
            className="w-24 h-28 cursor-default"
          />
          <p className="w-full text-lg font-semibold text-center">
            {exercice.name}
          </p>
          <div className="text-sm flex flex-col w-3/4 m-auto">
            <a
              href="#"
              className="inline-block py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded shadow text-center"
              onClick={handleClick}
            >
              Mirar video demostrativo
            </a>
          </div>
        </div>
      </label>
      {modal && (
        <Video exercice={exercice} modal={modal} handleClick={handleClick} />
      )}
    </li>
  );
}
