import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function AddList({ list }) {
  const { token } = useContext(AuthContext);
  const [selected, setSelected] = useState(false);

  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:6001/api/user/addShopping",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            list: list,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
      setSelected(true);
    } catch (error) {
      return false;
    }
  };

  const text = selected ? "¡Añadir a la lista!" : "¡Añadido!";

  return (
    <button className="mx-1" onClick={handleClick}>
      <span
        className="inline-flex items-center rounded-full p-2 bg-green-800 text-white group transition-all duration-500 focus:ring-2 focus:ring-green-800 focus:ring-offset-2 focus:outline-none"
        role="alert"
        tabIndex="0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>

        <span className="whitespace-nowrap inline-block group-hover:max-w-screen-2xl group-focus:max-w-screen-2xl max-w-0 scale-80 group-hover:scale-100 overflow-hidden transition-all duration-300 group-hover:px-2 group-focus:px-2">
          {text}
        </span>
      </span>
    </button>
  );
}
