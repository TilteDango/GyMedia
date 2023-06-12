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
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export default function RecipeDescriptionPDF({ modalOn, onClose, diet }) {
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

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
      {/* <div
        aria-hidden="true"
        className={
          modalOn
            ? "flex overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 justify-center items-center z-50 backdrop-blur"
            : "fixed top-0 left-0 w-full h-full flex justify-center items-start bg-gray-500 bg-opacity-50 z-50"
        }
      >
        <div className="flex">
          <img src={img} alt="Avocado" className="m-auto" />
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
      </div> */}
    </>
  );
}
