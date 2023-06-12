import React from "react";
import RutinasCard from "./RutinasCard";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Tab from "../Recetas/Tab";
import AddPost from "../Buttons/AddPost";
import AddRutina from "../Buttons/AddRutina";
import NavBar from "../NavBar/NavBar";
import { UserContext } from "../../Context/UserContext";

export default function CardIndex() {
  const [exercices, setExercices] = useState([]);
  const [exercicesByToken, setExercicesByToken] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const [active, setActive] = useState(true);
  const { recipeCont } = useContext(UserContext);

  const changeActive = async () => {
    setActive(!active);
    const postByToken = await getAllExercicesByToken();
  };

  async function getAllExercicesByToken() {
    const exercicies = await fetch(
      `http://127.0.0.1:6001/api/postExercices/byToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }
    ).then((res) => {
      return res.json();
    });
    setExercicesByToken(exercicies);
  }

  async function getExercices() {
    const exercicies = await fetch(`http://127.0.0.1:6001/api/postExercices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });
    return exercicies;
  }

  useEffect(() => {
    async function getData() {
      const exercicies = await getExercices();
      setExercices(exercicies.reverse());
    }

    getData();
  }, [recipeCont]);

  return (
    <>
      <NavBar />

      {token ? (
        <>
          {active ? (
            <>
              <div className="flex w-2/4 m-auto justify-evenly">
                <Tab active={true}>Rutinas recomendadas</Tab>
                <Tab active={false} changeActive={changeActive}>
                  Tus Rutinas
                </Tab>
              </div>
              <div className="bg-gray-100 p-4">
                <div className="mt-4 mx-4 grid grid-flow-row gap-4 justify-items-center lg:grid-cols-4 md:grid-cols-2">
                  {exercices.map((exercice, index) => (
                    <div key={index} className="h-full">
                      <RutinasCard exercice={exercice} key={index} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-2/4 m-auto justify-evenly">
                <Tab active={false} changeActive={changeActive}>
                  Rutinas recomendadas
                </Tab>
                <Tab active={true}>Tus Rutinas</Tab>
              </div>

              <div className="bg-gray-100 p-4 h-screen">
                <div className="mx-4 grid grid-cols-1">
                  <div className="flex justify-end">
                    <AddRutina />
                  </div>
                </div>
                <div className="mt-4 mx-4 grid grid-flow-row gap-4 justify-items-center lg:grid-cols-4 md:grid-cols-2">
                  {exercicesByToken.map((exercice, index) => (
                    <div key={index} className="h-full">
                      <RutinasCard exercice={exercice} key={index} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="bg-gray-100 p-4">
            <div className="mt-4 mx-4 grid grid-cols-4 gap-4 justify-items-center">
              {exercices.map((exercice, index) => (
                <div key={index} className="h-full">
                  <RutinasCard exercice={exercice} key={index} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
