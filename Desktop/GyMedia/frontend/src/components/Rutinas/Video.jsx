import React from "react";

export default function Video({ exercice, modal, handleClick }) {
  return (
    <div
      className={
        modal
          ? "fixed inset-0 flex items-center justify-center z-50 backdrop-blur"
          : "hidden"
      }
    >
      <button
        onClick={handleClick}
        type="button"
        className="text-orange-400 bg-transparent hover:bg-gray-200 hover:text-orange-900 rounded-lg text-sm p-1.5 ml-auto absolute top-24 right-80 mr-2"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <video src={exercice.video} controls width="640" height="360" />
    </div>
  );
}
