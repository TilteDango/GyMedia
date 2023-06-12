import React, { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [postCont, setPost] = useState(0);
  const refreshPost = () => {
    setPost((prev) => prev + 1);
  };

  const getAllPosts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:6001/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
  };

  const getAllPostsByToken = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:6001/api/post/byToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
  };

  const getAllExercicesPost = async (id) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:6001/api/postExercices/byId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        getAllPosts,
        refreshPost,
        postCont,
        getAllPostsByToken,
        getAllExercicesPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
