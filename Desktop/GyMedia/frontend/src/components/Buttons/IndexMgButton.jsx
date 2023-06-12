import React from "react";
import { useState, useContext, useEffect } from "react";
import LogInForm from "../NavBar/LogIn/LogInForm";
import { UserContext } from "../../Context/UserContext";
import { AuthContext } from "../../Context/AuthContext";
import { PostContext } from "../../Context/PostContext";

export default function IndexMgButton({ id, liked_by }) {
  const { getUserByToken, token } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const { refreshPost } = useContext(PostContext);

  const cssnme = liked ? "w-6 h-6 text-pink-500" : "w-6 h-6";
  const filled = liked ? "currentColor" : "none";
  useEffect(() => {
    if (token) {
      async function getInfo() {
        const userFound = await getUserByToken(token);
        const user = userFound.userFound;
        setUserInfo(user);

        if (liked_by.includes(user._id)) {
          setLiked(true);
        }
      }

      getInfo();
    }
  }, []);

  const handleClick = async () => {
    if (token != null) {
      setLiked(!liked);
      const response = await fetch("http://127.0.0.1:6001/api/post/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Connection: "keep-alive",
        },
        body: JSON.stringify({
          token: token,
          postId: id,
        }),
      }).then((res) => res.json());
      refreshPost();
    } else {
      setModal(true);
    }
  };

  const onClose = () => {
    setModal(false);
  };
  return (
    <>
      <button onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={filled}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={cssnme}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
      {modal && <LogInForm onClose={onClose} />}
    </>
  );
}
