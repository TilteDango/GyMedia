import React, { useEffect, useState, useContext } from "react";
import { PostContext } from "../../Context/PostContext";
import CloseButton from "../Buttons/CloseButton";

export default function Testing({ frames, modal, onClose }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < frames.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleClick = () => {
    onClose();
  };

  const cssname = modal
    ? "fixed inset-0 flex items-center justify-center z-50 backdrop-blur"
    : "hidden";

  return (
    <div className={cssname}>
      <div className="overlay">
        <div className="gallery border-2 rounded mx-auto bg-white w-4/5 m-auto">
          <div className="top flex p-2 border-b select-none">
            <div className="heading text-gray-800 w-full pl-3 font-semibold my-auto">
              {frames[index].title}
            </div>
            <div className="buttons ml-auto flex text-gray-600 mr-1">
              <svg
                className={`w-7 border-2 rounded-l-lg p-1 cursor-pointer border-r-0 ${
                  index === 0 ? "opacity-50" : ""
                }`}
                onClick={handlePrev}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <svg
                className={`w-7 border-2 rounded-r-lg p-1 cursor-pointer ${
                  index === frames.length - 1 ? "opacity-50" : ""
                }`}
                onClick={handleNext}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <CloseButton handleClick={handleClick} />
            </div>
          </div>
          <div className="content-area w-full  overflow-hidden">
            <div className="platform shadow-xl h-full flex">
              <div className="each-frame border-box flex-none h-full">
                <div className="main flex w-full p-8">
                  <div className="sub w-4/6 my-auto">
                    <img
                      className="w-full p-8"
                      src={frames[index].imageSrc}
                      alt=""
                    />
                  </div>
                  <div className="sub w-full my-auto">
                    <div className="head text-3xl font-bold mb-4">
                      {frames[index].title}
                    </div>
                    <div className="long-text text-lg">
                      {frames[index].text}
                    </div>
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-10"
                      onClick={handleNext}
                    >
                      Siguiente día
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
