import { useEffect, useState } from "react";
import React from "react";
import CloseButton from "../Buttons/CloseButton";

export default function ShoppingList({ modal, list, onClose }) {
  const [done, setDone] = useState([]);
  const [deleted, setDeleted] = useState([]);

  const handleClick = (index) => {
    if (done.includes(index)) {
      setDone(done.filter((item) => item !== index));
    } else {
      setDone([...done, index]);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleDeleteClick = (index) => {
    setDeleted([...deleted, index]);
  };

  // Filtrar la lista de elementos eliminados
  const filteredList = list.filter((_, index) => !deleted.includes(index));

  return (
    <div
      aria-hidden="true"
      className={
        modal
          ? "flex overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 justify-center items-center z-50 backdrop-blur"
          : "fixed top-0 left-0 w-full h-full flex justify-center items-start bg-gray-500 bg-opacity-50 z-50"
      }
    >
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-medium mb-2">Lista de la compra</h1>
          </div>
          <CloseButton handleClick={handleClose} />
        </div>
        <p className="text-slate-500 mb-2">
          ¡Aquí está la lista de la compra de tus recetas favoritas!
        </p>
        {filteredList.map((task, index) => (
          <div
            key={index}
            id="task"
            className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4 border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
          >
            <div className="inline-flex items-center space-x-2">
              <div>
                {done.includes(index) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <div
                className={
                  done.includes(index) ? "text-slate-500 line-through" : ""
                }
                onClick={() => handleClick(index)}
              >
                {task.quantity} {task.unity} de {task.name}
              </div>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
                onClick={() => handleDeleteClick(index)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        ))}
        <p className="text-xs text-slate-500 text-center mt-2">GyMedia</p>
      </div>
    </div>
  );
}
