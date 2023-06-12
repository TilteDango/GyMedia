import React, { useState, useContext } from "react";
import CloseButton from "../Buttons/CloseButton";
import RutinasTitleUpload from "../UploadFiles/RutinasTitleUpload";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";

export default function AddRutinaCard({ modal, onClose }) {
  const { token } = useContext(AuthContext);
  const [description, setDescription] = useState(false);
  const [image, setImage] = useState(false);
  const [days, setDays] = useState(0);
  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rutinaDescription, setRutinaDescription] = useState("");
  const [isValidForm, setIsValidForm] = useState(true);
  const { refreshRecipe } = useContext(UserContext);
  const [categories, setCategories] = useState([
    "Fitness",
    "Entrenamiento",
    "Transformación corporal",
    "Salud y bienestar",
    "Desarrollo personal",
    "Pérdida de peso",
    "Musculación",
    "Resistencia",
    "Bienestar",
    "Alto rendimiento",
    "Desarrollo atlético",
    "Fuerza",
    "Mejora del rendimiento",
    "Fitness en casa",
    "Ejercicios sin equipo",
    "Salud en el hogar",
    "Mantenimiento físico",
    "Entrenemiento flexible",
  ]);

  const handleTitleClick = () => {
    setDescription(true);
  };

  const handleDescriptionClick = () => {
    setImage(true);
  };

  const setSelectedDays = (e) => {
    setDays(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e, category) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleDescriptionChange = (e) => {
    setRutinaDescription(e.target.value);
  };

  const saveChanges = async () => {
    if (
      title.trim() === "" ||
      selectedCategories.length === 0 ||
      rutinaDescription.trim() === ""
    ) {
      setIsValidForm(false);
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:6001/api/postExercices/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: title,
            categories: selectedCategories,
            creator: token,
            description: rutinaDescription,
          }),
        }
      );
      refreshRecipe();

      const data = await response.json();
      onClose();
    } catch (error) {
      return false;
    }
  };
  return (
    <div
      className={
        modal
          ? "flex overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 justify-center items-center z-50 backdrop-blur"
          : "fixed top-0 left-0 w-full h-full justify-center items-start bg-gray-500 bg-opacity-50 z-50 hidden"
      }
      aria-hidden="true"
    >
      <div className="w-3/4 md:w-2/5 mx-auto mt-10 ">
        <div className="bg-white p-10 rounded-xl">
          <CloseButton handleClick={onClose} />
          <h1 className="text-center text-2xl font-semibold text-gray-500">
            ¿De cuántos días es la rutina?
          </h1>

          <div className="flex flex-wrap justify-center mt-10 space-x-3 my-5">
            {Array.from({ length: 7 }).map((_, index) => (
              <option
                key={index}
                value={index + 1}
                className={`flex items-center justify-center w-10 h-10 bg-gray--100 text-gray-600 hover:bg-orange-500 transition duration-150 rounded-full font-bold hover:text-orange-50 cursor-pointer ${
                  days == index + 1 ? "bg-orange-500 text-orange-50" : ""
                }`}
                onClick={setSelectedDays}
              >
                {index + 1}
              </option>
            ))}
          </div>
          <div className="flex justify-center border-2 py-2 px-6 rounded-xl">
            <input
              type="text"
              placeholder="Escribe el título de la rutina"
              className="w-full outline-none text-gray-700 text-lg border-none bg-transparent"
              value={title}
              onChange={handleTitleChange}
            />
            <button
              type="submit"
              className="bg-orange-500 text-orange-50 font-semibold px-6 py-2 rounded-xl text-md"
              onClick={handleTitleClick}
            >
              Siguiente
            </button>
          </div>
          {description && (
            <>
              <h1 className="text-center text-2xl font-semibold text-gray-500 mt-5">
                Categorías
              </h1>
              <div className="flex flex-wrap justify-center mt-10">
                {categories.map((categorie, index) => (
                  <React.Fragment key={index}>
                    <div className="w-1/3 my-5">
                      <input
                        type="checkbox"
                        id={`choose-me-${index}`}
                        className="peer hidden"
                        onChange={(e) => handleCategoryChange(e, categorie)}
                      />
                      <label
                        htmlFor={`choose-me-${index}`}
                        className="select-none cursor-pointer rounded-lg border-2 border-orange-500 py-3 px-6 font-bold text-orange-500 transition-colors duration-200 ease-in-out peer-checked:bg-orange-500 peer-checked:text-orange-50 peer-checked:border-orange-500"
                      >
                        {categorie}
                      </label>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-center border-2 py-2 px-6 rounded-xl mt-2">
                <textarea
                  placeholder="Escribe una breve descripción de la rutina"
                  className="w-full outline-none text-gray-700 text-lg border-none bg-transparent"
                  value={rutinaDescription}
                  onChange={handleDescriptionChange}
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-orange-50 font-semibold px-6 py-2 rounded-xl text-md"
                  onClick={handleDescriptionClick}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
          {image && (
            <>
              <h1 className="text-center text-2xl font-semibold text-gray-500 my-5">
                Imagen de cabecera
              </h1>
              <RutinasTitleUpload />
              <button
                type="submit"
                className="bg-orange-500 text-orange-50 font-semibold px-6 py-2 rounded-xl text-md w-1/4 m-auto block"
                onClick={saveChanges}
              >
                Guardar cambios
              </button>
            </>
          )}
        </div>
      </div>
      {!isValidForm && (
        <div
          className="font-regular relative block w-1/6 rounded-lg bg-red-400 p-4 text-base leading-5 text-white opacity-100"
          style={{ position: "absolute", top: 15, right: 15 }}
        >
          La rutina no se pudo crear, rellene los campos pertinentes
        </div>
      )}
    </div>
  );
}
