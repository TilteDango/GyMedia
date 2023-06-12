import { NavLink } from "react-router-dom";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
function NavSignUp() {
  const [modalOn, setModalOn] = useState(false);

  const handleClose = () => {
    setModalOn(false);
  };

  const handleClick = () => {
    setModalOn(true);
  };
  return (
    <>
      <NavLink className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" onClick={handleClick}>
        Registrarse
      </NavLink>
      {modalOn && <SignUpForm modalOn={modalOn} onClose={handleClose} />}
    </>
  );
}

export default NavSignUp;
