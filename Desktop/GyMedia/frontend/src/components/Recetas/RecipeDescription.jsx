import React from "react";
import MgButton from "../Buttons/MgButton";
import CloseButton from "../Buttons/CloseButton";
import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import ReviewButton from "../Buttons/ReviewButton";
import MgButtonInside from "../Buttons/MgButtonInside";
import AddList from "../Buttons/AddList";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PDFButton from "../Buttons/PdfButton";

export default function RecipeDescription({ modalOn, onClose, diet }) {
  const {
    img,
    username,
    category,
    title,
    description,
    stars,
    reviews,
    liked,
    _id,
    created,
    steps,
    ingredients,
  } = diet;

  const handleClick = () => {
    onClose();
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={
          modalOn
            ? "flex overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 justify-center items-center z-50 backdrop-blur"
            : "fixed top-0 left-0 w-full h-full flex justify-center items-start bg-gray-500 bg-opacity-50 z-50"
        }
      >
        <div className="">
          <div className="w-2/4 bg-slate-50 px-4 py-5 space-y-3 m-auto scroll-auto">
            <div className="flex justify-between">
              <div>
                <EditButton />
                <DeleteButton id={_id} created={created} />
              </div>
              <div>
                <AddList list={ingredients} />
                <PDFButton diet={diet} />
                <MgButtonInside isLiked={liked} _id={_id} />
                <ReviewButton id={_id} />
                <CloseButton handleClick={handleClick} />
              </div>
            </div>
            
            <div className="">
              <img src={img} alt="Avocado" className="object-contain h-96 w-full" />
            </div>
            <div id="downloadable">
              <div className="space-y-2">
                <h2>{title}</h2>
                <div className="m-auto w-2/4 flex justify-center">
                  <span className="bg-green-800 rounded-md p-1 text-white">
                    {category}
                  </span>
                </div>
              </div>
              <div>{description}</div>
              <div>
                <h2 className="text-lg">Ingredientes :</h2>
                <ul className="list-disc pl-5">
                  {ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                    >{`${ingredient.quantity} ${ingredient.unity}  de ${ingredient.name}`}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg">Instrucciones :</h2>
                <ul className="list-decimal pl-5">
                  {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
