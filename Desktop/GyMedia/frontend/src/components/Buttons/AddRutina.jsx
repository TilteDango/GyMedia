import React from "react";
import { useState, useEffect } from "react";
import CreatePost from "../Index/CreatePost";
import AddRutinaCard from "../Rutinas/AddRutinaCard";
import { AuthContext } from "../../Context/AuthContext";

export default function AddRutina() {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <>
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        + Rutina
      </button>
      {modal && <AddRutinaCard modal={modal} onClose={handleClose} />}
    </>
  );
}
