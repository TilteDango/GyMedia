import { NavLink } from "react-router-dom";
import LogInForm from "./LogInForm";
import { useState } from "react";

function NavLogIn({ modifyToken }) {
  const [modalOn, setModalOn] = useState(false);

  const HandleClose = () => {
    setModalOn(false);
  };

  const HandleClick = () => {
    setModalOn(true);
  };

  return (
    <>
      <NavLink
        className="hidden lg:inline-block py-2 px-6 bg-green-700 hover:bg-green-800 text-sm text-white font-bold rounded-xl transition duration-200"
        onClick={HandleClick}
      >
        Iniciar Sesión
      </NavLink>
      {modalOn && (
        <LogInForm
          modalOn={modalOn}
          onClose={HandleClose}
          modifyToken={modifyToken}
        />
      )}
    </>
  );
}

export default NavLogIn;
