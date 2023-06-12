import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { LogInInput as Input } from "./LogInInput";
import { AuthContext } from "../../../Context/AuthContext";

function LogInForm({ modalOn, onClose }) {
  const [modal, setModal] = useState(modalOn);
  const [checkBox, setCheckBox] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUserUpdate = (name, value) => {
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  useEffect(() => {
    setModal(modalOn);
  }, [modalOn]);

  const handleClick = () => {
    setModal(!modal);
    onClose();
  };

  const handleOnChange = (e) => {
    const checked = e.target.checked;
    setCheckBox(checked);
    setUser((prevUser) => ({ ...prevUser, remember: checked }));
  };

  const handleFormClick = async (e) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:6001/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Connection: "keep-alive",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        document.getElementById("matches").innerText = data.message;
      } else {
        const data = await response.json();
        const tokenJSON = data.token;
        localStorage.setItem("token", tokenJSON);
        setToken(tokenJSON);
        setIsLoading(false);
        onClose();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div
      aria-hidden="true"
      className={
        modal
          ? "flex overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 justify-center items-center z-50 backdrop-blur"
          : "fixed top-0 left-0 w-full h-full flex justify-center items-start bg-gray-500 bg-opacity-50 z-50"
      }
    >
      <div className="relative w-full max-w-md px-4 h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="bg-white rounded-lg shadow relative">
          <div className="flex justify-end p-2">
            <button
              onClick={handleClick}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900">
              Iniciar Sesión
            </h3>
            <p id="matches" className="text-red-500 m-auto"></p>
            <Input
              type={"email"}
              name="email"
              id="email"
              placeholder="Introduzca su correo electrónico aquí"
              user={user}
              onUserUpdate={handleUserUpdate}
            >
              Correo electrónico
            </Input>
            <Input
              type={"password"}
              name="password"
              id="password"
              placeholder="Introduzca su contraseña aquí"
              user={user}
              onUserUpdate={handleUserUpdate}
            >
              Contraseña
            </Input>
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                    required=""
                    onChange={handleOnChange}
                  />
                </div>
                <div className="text-sm ml-3">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-900"
                  >
                    ¡Recuérdame!
                  </label>
                </div>
              </div>
              <NavLink
                href="#"
                className="text-sm text-orange-500 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </NavLink>
            </div>
            <button
              className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleFormClick}
            >
              Iniciar sesión
            </button>
            <div className="text-sm font-medium text-gray-500">
              ¿No tienes cuenta?{" "}
              <NavLink className="text-orange-700 hover:underline">
                Registrate
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
