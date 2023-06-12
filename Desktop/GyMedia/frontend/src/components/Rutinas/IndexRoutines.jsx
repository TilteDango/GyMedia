import React from "react";
import { useState, useEffect, useContext } from "react";
import CheckBoxRoutine from "./CheckBoxRoutine";

export default function IndexRoutines() {
  const [exercices, setExercices] = useState([]);
  async function getExercices() {
    const exercicies = await fetch(`http://127.0.0.1:6001/api/exercices`, {
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
  }, []);

  return (
    <>
      <ul className="grid w-full gap-6 md:grid-cols-6">
        {exercices.map((exercice, index) => (
          <div key={index}>
            <CheckBoxRoutine exercice={exercice} />
          </div>
        ))}
      </ul>
    </>
  );
}
