import React, { useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

export default function ChangePasswordForm({ changeAlert }) {
  const { token } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:6001/api/auth/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            newPassword: newPassword,
            userId: token,
          }),
        }
      );

      const data = await response.json();
      console.log("llega");
      changeAlert();
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="relative py-3 sm:w-96 mx-auto text-center">
      <span className="text-2xl font-bold text-gray-900">
        Cambia tu contraseña
      </span>
      <div className="mt-4 bg-white shadow-md rounded-lg text-left">
        <div className="h-2 bg-orange-600 rounded-t-md"></div>
        <div className="px-8 py-6">
          <label className="block font-semibold">Contraseña actual</label>
          <input
            type="password"
            placeholder="Contraseña actual"
            className="border border-gray-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-orange-600 focus:ring-1 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block mt-3 font-semibold">Nueva contraseña</label>
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="border border-gray-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-orange-600 focus:ring-1 rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="block mt-3 font-semibold">
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            className="border border-gray-400 w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-orange-600 focus:ring-1 rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex justify-between items-baseline">
            <button
              onClick={handleClick}
              type="submit"
              className="mt-4 bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
