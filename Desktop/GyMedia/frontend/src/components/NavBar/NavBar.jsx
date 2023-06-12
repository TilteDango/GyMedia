import NavSeparator from "./NavSeparator";
import NavItem from "./NavItem";
import NavLogIn from "./LogIn/NavLogIn";
import NavSignUp from "./SignUp/NavSignUp";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import NavUser from "../User/NavUser";

function NavBar() {
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, [token]);

  return (
    <div className="bg-blue-500">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <img src="logo.png" alt="logo" className="h-20" />

        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <NavItem path="/">Inicio</NavItem>
          <NavSeparator />

          <NavItem path="/Rutinas">Rutinas</NavItem>
          <NavSeparator />

          <NavItem path="/Recetas">Recetas</NavItem>
        </ul>
        {token ? (
          <NavUser />
        ) : (
          <>
            <NavSignUp /> <NavLogIn />
          </>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
