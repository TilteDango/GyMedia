import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Title from "./AddRecipeComponents/Title";
import Description from "./AddRecipeComponents/Description";
import Category from "./AddRecipeComponents/Category";
import HeaderImage from "./AddRecipeComponents/HeaderImage";
import CookingTime from "./AddRecipeComponents/CookingTime";
import CreateRecipe from "../Buttons/CreateRecipe";
import UserImage from "./AddRecipeComponents/UserImage";
import { AuthContext } from "../../Context/AuthContext";
import { RecipeContext } from "../../Context/RecipeContext";
import Persons from "./AddRecipeComponents/Persons";

export default function AddRecipe({
  modalOn,
  onClose,
  updatePart,
  updateFormData,
  appendFormData,
}) {
  const [modal, setModal] = useState(modalOn);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshRecipe } = useContext(RecipeContext);
  const [userInfo, setUserInfo] = useState([]);
  const { token, getUserByToken } = useContext(AuthContext);
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    img: "",
    cookingTime: "",
    token: token,
    category: "",
    persons: 1,
  });

  useEffect(() => {
    setModal(modalOn);
  }, [modalOn]);

  useEffect(() => {
    const getData = async () => {
      const userInfo = await getUserByToken(token);
      setUserInfo(userInfo);
    };
    getData();
  }, []);

  const handleImageChange = (e) => {
    setRecipe({ ...recipe, img: e.target.files[0].name });
  };

  const handleClick = async () => {
    updateFormData(recipe);

    updatePart();
  };

  const handleCancelClic = () => {
    setModal(!modal);
    onClose();
  };

  const handleRecipeUpdate = (name, value) => {
    setRecipe((recipe) => ({ ...recipe, [name]: value }));
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
      <div className="relative py-3 sm:mx-auto sm:max-w-xl w-3/4">
        <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-green-800 to-light-green-500 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl" />
        <div className="relative bg-gray-100 px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mx-auto max-w-md">
            <UserImage onclick={handleCancelClic} />
            <div className="divide-y divide-gray-200">
              <div className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <Title onUserUpdate={handleRecipeUpdate} name="title" />
                <Description
                  onUserUpdate={handleRecipeUpdate}
                  name="description"
                />
                <Category onUserUpdate={handleRecipeUpdate} name={"category"} />
                <HeaderImage
                  onUserUpdate={handleImageChange}
                  appendFormData={appendFormData}
                />
                <CookingTime
                  onUserUpdate={handleRecipeUpdate}
                  name="cookingTime"
                />
                <Persons handleInputChange={handleRecipeUpdate} />
                <CreateRecipe handleClick={handleClick}>
                  Crear receta
                </CreateRecipe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
