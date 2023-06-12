import React from "react";
import { useState, useContext, useEffect } from "react";
import AddRecipe from "./AddRecipe";
import AddRecipePartTwo from "./AddRecipePartTwo";
import AddRecipePartThree from "./AddRecipePartThree";
import { RecipeContext } from "../../Context/RecipeContext";

export default function FormAddRecipe({ modalOn, onClose, setIsValidForm }) {
  const { refreshRecipe } = useContext(RecipeContext);
  const [part, setPart] = useState(1);
  const [render, setRender] = useState(false);
  const [imgFile, setImgFile] = useState();
  const [json, setJson] = useState({
    title: "",
    description: "",
    img: "",
    cookingTime: "",
    token: "",
    category: "",
    ingredients: [],
    steps: [],
    persons: 1,
  });
  const formData = new FormData();

  useEffect(() => {
    if (part == 4) {
      handleCaseFour();
    }
  }, [part]);

  const updatePart = () => {
    setPart(part + 1);
  };
  const appendFormData = async (e) => {
    setImgFile(e.target.files[0]);
  };

  const updateFormData = async (newJson) => {
    setJson({ ...json, ...newJson });
  };

  const handleSteps = async (value) => {
    setJson((prevJson) => ({ ...prevJson, ["steps"]: value }));
  };

  const handleIngredients = (value) => {
    setJson((prevJson) => ({ ...prevJson, ["ingredients"]: value }));
  };

  const handleCaseFour = async () => {
    if (!render) {
      setRender(true);

      try {
        const response = await fetch("http://127.0.0.1:6001/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json();
          console.error(data);
          setIsValidForm(false);

          setTimeout(() => {
            setIsValidForm(true);
          }, 3000);
        } else {
          const data = await response.json();
          const imgId = data.imgId;
          formData.append("imgId", imgId);
          formData.append("img", imgFile);
          const rs = await fetch("http://127.0.0.1:6001/api/recipes/img", {
            method: "PUT",
            body: formData,
            credentials: "include",
          });
        }
        refreshRecipe();
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  let showComponent;

  switch (part) {
    case 1:
      showComponent = (
        <AddRecipe
          modalOn={modalOn}
          updatePart={updatePart}
          updateFormData={updateFormData}
          onClose={onClose}
          appendFormData={appendFormData}
        />
      );
      break;
    case 2:
      showComponent = (
        <AddRecipePartTwo
          updatePart={updatePart}
          updateFormData={handleIngredients}
          modalOn={modalOn}
          onClose={onClose}
          recipeName={json.title}
        />
      );
      break;
    case 3:
      showComponent = (
        <AddRecipePartThree
          updateFormData={handleSteps}
          updatePart={updatePart}
          modalOn={modalOn}
          onClose={onClose}
          recipeName={json.title}
        />
      );
      break;
  }

  return <>{showComponent}</>;
}
