import React, { useState, useEffect, useContext } from "react";
import PostComponent from "./PostComponent";
import { PostContext } from "../../Context/PostContext";
import { AuthContext } from "../../Context/AuthContext";
import Tab from "../Recetas/Tab";
import AddPost from "../Buttons/AddPost";
import NavBar from "../NavBar/NavBar";

export default function IndexComponent() {
  const { getAllPosts, postCont, getAllPostsByToken } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const [postsByToken, setPostsByToken] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const [active, setActive] = useState(true);
  useEffect(() => {
    async function getPosts() {
      const allPosts = await getAllPosts();

      setPosts(allPosts.reverse());
    }

    getPosts();
  }, [postCont]);

  const changeActive = async () => {
    setActive(!active);
    const postByToken = await getAllPostsByToken(token);
    setPostsByToken(postByToken);
  };

  return (
    <>
      <NavBar />
      {token ? (
        <>
          {active ? (
            <>
              <div className="flex w-2/4 m-auto justify-evenly">
                <Tab active={true}>Posts Recomendados</Tab>
                <Tab active={false} changeActive={changeActive}>
                  Tus Posts
                </Tab>
              </div>
              <div className="bg-gray-100 p-4">
                {posts.map((post, index) => (
                  <div key={index}>
                    <PostComponent key={post.id} post={post} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex w-2/4 m-auto justify-evenly">
                <Tab active={false} changeActive={changeActive}>
                  Posts Recomendados
                </Tab>
                <Tab active={true}>Tus Posts</Tab>
              </div>

              <div className="bg-gray-100 p-4">
                <AddPost />
                {postsByToken.map((post, index) => (
                  <div key={index}>
                    <PostComponent key={post.id} post={post} active={true} />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="bg-gray-100 p-4">
            {posts.map((post, index) => (
              <div key={index}>
                <PostComponent key={post._id} post={post} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
