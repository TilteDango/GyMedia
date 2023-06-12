import React from "react";
import { useContext, useState } from "react";
import ReviewStars from "../Review/ReviewStars";

export default function ReviewButton({ id }) {
  const [modalOn, setModalOn] = useState(false);
  const handleClick = () => {
    setModalOn(true);
  };

  const changeModalOn = () => {
    setModalOn(false);
  };
  return (
    <>
      <button className="mx-1" onClick={handleClick}>
        <span
          className="inline-flex items-center rounded-full p-2 bg-yellow-500 text-white group transition-all duration-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
          role="alert"
          tabIndex="0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>

          <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-500 group-hover:px-2 group-focus:px-2">
            ¡Valorar!
          </span>
        </span>
      </button>
      {modalOn && (
        <ReviewStars modalOn={modalOn} changeModalOn={changeModalOn} id={id} />
      )}
    </>
  );
}
