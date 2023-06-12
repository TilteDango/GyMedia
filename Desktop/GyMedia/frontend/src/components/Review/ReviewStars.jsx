import React, { useState, useContext } from "react";
import { RecipeContext } from "../../Context/RecipeContext";

export default function ReviewStars({ modalOn, changeModalOn, id }) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [edit, setEdited] = useState(false);
  const [modal, setModal] = useState(modalOn);
  const [stars, setStars] = useState(modalOn);
  const [reviewed, setReviewed] = useState(false);
  const { refreshRecipe } = useContext(RecipeContext);

  const handleMouseEnter = (index) => {
    setSelectedStars(index + 1);
  };

  const handleMouseLeave = () => {
    if (selectedStars > 0 && !edit) {
      setSelectedStars(0);
    }
  };

  const handleClick = (index) => {
    setSelectedStars(index + 1);
    setEdited(true);
    setStars(index + 1);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:6001/api/recipes/addReview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idRecipe: id,
            stars: stars,
          }),
        }
      );

      const data = await response.json();
    } catch (error) {
      return false;
    }
    setReviewed(true);
    refreshRecipe();
    changeModalOn();
  };

  const cssname = modal
    ? "fixed inset-0 flex items-center justify-center z-50 backdrop-blur"
    : "hidden";

  return (
    <>
      <div className={cssname}>
        <div className="flex flex-col items-center bg-white p-4 rounded-lg">
          {reviewed ? (
            <></>
          ) : (
            <>
              <div className="flex space-x-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    className={`w-12 h-12 ${
                      i < selectedStars ? "text-orange-500" : "text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(i)}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <button
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleButtonClick}
              >
                ¡Valorar!
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
