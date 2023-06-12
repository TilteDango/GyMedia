import React from "react";
import { useState, useEffect } from "react";
import CreatePost from "../Index/CreatePost";

export default function AddPost() {
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
        + Post
      </button>

      {modal && <CreatePost modal={modal} onClose={handleClose} />}
    </>
  );
}
