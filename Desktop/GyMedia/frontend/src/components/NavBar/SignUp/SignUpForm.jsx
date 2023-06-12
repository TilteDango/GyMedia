import { LogInInput as Input } from "../LogIn/LogInInput";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

function SignUpForm({ modalOn, onClose }) {
  const { token, setToken } = useContext(AuthContext);
  const [modal, setModal] = useState(modalOn);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: "",
  });

  useEffect(() => {
    setModal(modalOn);
  }, [modalOn]);

  const handleUserUpdate = (name, value) => {
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleClick = () => {
    setModal(!modal);
    onClose();
  };

  const handleFormClick = async (e) => {
    setIsLoading(true);

    if (user.registerPassword !== user.registerPassword2) {
      console.error("Password does not match");
    } else {
      const User = {
        username: user.username,
        email: user.registerEmail,
        password: user.registerPassword,
      };
      try {
        const response = await fetch("http://127.0.0.1:6001/api/auth/singUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(User),
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error("Error al registrarse");
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
      <div className="flex justify-center px-6 my-1">
        {/* <!-- Row --> */}
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          {/* <!-- Col --> */}
          <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
            <img
              src="/SignUpPhoto.jpg"
              alt="Foto decorativa para registrarse"
              className="h-full rounded"
            />
          </div>
          {/* <!-- Col --> */}
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="flex">
              <h3 className="pt-4 text-2xl text-center w-full">
                Crea una cuenta
              </h3>
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
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Introduzca su nombre de usuario"
                    user={user}
                    onUserUpdate={handleUserUpdate}
                  >
                    Nombre de Usuario
                  </Input>
                </div>
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  id="registerEmail"
                  name="registerEmail"
                  placeholder="Introduzca su correo electrónico"
                  user={user}
                  onUserUpdate={handleUserUpdate}
                >
                  Correo electrónico
                </Input>
              </div>
              <div className="mb-4">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <Input
                    type="password"
                    id="registerPassword"
                    name="registerPassword"
                    placeholder="Introduzca su contraseña"
                    user={user}
                    onUserUpdate={handleUserUpdate}
                  >
                    Contraseña
                  </Input>
                </div>
                <div className="mb-4 mt-3">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <Input
                      type="password"
                      id="registerPassword2"
                      name="registerPassword2"
                      placeholder="Repita su contraseña"
                      user={user}
                      onUserUpdate={handleUserUpdate}
                    >
                      Repite la Contraseña
                    </Input>
                  </div>
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleFormClick}
                >
                  Registrarse
                </button>
              </div>

              <div className="text-center">
                <p>
                  ¿Ya tienes cuenta?
                  <a
                    className="inline-block text-sm text-orange-500 align-baseline hover:text-orange-800 ml-1"
                    href="./index.html"
                  >
                    ¡Inicia sesión!
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
