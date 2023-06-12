import React, { useState, useEffect, useContext } from "react";
import EditProfile from "./EditProfile/EditProfile";
import { Link } from "react-router-dom";
import Statics from "./Statics/Statics";
import Notifications from "./Notifications/Notifications";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";

export default function Dashboard() {
  const [editProfile, setEditProfile] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [stadistics, setStadistics] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const { getUserInfo } = useContext(UserContext);
  const { getUserByToken, token } = useContext(AuthContext);

  useEffect(() => {
    async function getInfo() {
      const userFound = await getUserByToken(token);
      const user = userFound.userFound;
      let userInf;
      userInf = await getUserInfo(user._id);
      setUserInfo(userInf);
    }
    getInfo();
  }, []);

  const handleEditClick = () => {
    setNotifications(false);
    setStadistics(false);
    setEditProfile(true);
  };

  const handleNotificationClick = () => {
    setEditProfile(false);
    setStadistics(false);
    setNotifications(true);
  };

  const handleStadisticClick = () => {
    setEditProfile(false);
    setNotifications(false);
    setStadistics(true);
  };

  return (
    <div className="relative bg-orange-50 overflow-hidden max-h-screen">
      <header className="fixed right-0 top-0 left-60 bg-orange-50 py-3 px-4 h-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl text-center">
            {stadistics && "Estadisticas"}
            {editProfile && "Editar perfil"}
            {notifications && "Notificaciones"}
          </h1>
          <div className="flex items-center justify-between"></div>
        </div>
      </header>

      <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-grow">
            <div className="px-4 py-6 text-center border-b">
              <h1 className="text-xl font-bold leading-none">
                <span className="text-yellow-700">GYM</span> Media
              </h1>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                <li>
                  <a
                    onClick={handleStadisticClick}
                    className={
                      stadistics
                        ? "flex items-center bg-orange-200 rounded-xl font-bold text-sm text-orange-900 py-3 px-4"
                        : "flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                      />
                    </svg>
                    Estadisticas
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleEditClick}
                    className={
                      editProfile
                        ? "flex items-center bg-orange-200 rounded-xl font-bold text-sm text-orange-900 py-3 px-4"
                        : "flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="text-lg mr-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                    </svg>
                    Editar perfil
                  </a>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                      />
                    </svg>
                    Volver
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <main className="ml-60 pt-16">
        {editProfile ? <EditProfile userInfo={userInfo} /> : <></>}
        {notifications ? <Notifications /> : <></>}
        {stadistics ? <Statics /> : <></>}
      </main>
    </div>
  );
}
