import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import ShoppingList from "../Recetas/ShoppingList";

function NavUser() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken, getUserByToken } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  const { getUserInfo } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    async function getInfo() {
      const userFound = await getUserByToken(token);
      const user = userFound.userFound;
      const userInfo = await getUserInfo(user._id);
      setUserInfo(userInfo);
    }
    getInfo();
  }, []);

  const handleClick = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const HandleLogOutClick = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative">
        <img
          id="avatarButton"
          type="button"
          onClick={toggleDropdown}
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="w-10 h-10 rounded-full cursor-pointer"
          src={userInfo.image}
          alt="User dropdown"
        />

        <div
          id="userDropdown"
          className={`${
            isOpen ? "block" : "hidden"
          } absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md z-50`}
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div>{userInfo.username}</div>
            <div className="font-medium truncate">{userInfo.email}</div>
          </div>
          <div className="py-1">
            <Link
              to="/user-profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              Perfil
            </Link>
          </div>
          <div className="py-1">
            <Link
              to="/user-settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Ajustes
            </Link>
          </div>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleClick}
            >
              Lista de la compra
            </a>
          </div>
          <div className="py-1" onClick={HandleLogOutClick}>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>
      {modal && (
        <ShoppingList modal={modal} list={userInfo.list} onClose={onClose} />
      )}
    </>
  );
}

export default NavUser;
