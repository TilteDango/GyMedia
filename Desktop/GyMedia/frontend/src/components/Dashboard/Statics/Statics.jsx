import React, { useRef, useEffect, useState } from "react";
import Stripe from "../Stripe/Stripe";

export default function Statics() {
  const chartRef = useRef();
  const chartFollows = useRef();
  const chartCategory = useRef();
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.min.js";
    script.async = true;
    script.onload = () => {
      // Aquí puedes inicializar tu gráfico Chart.js
      new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
          datasets: [
            {
              label: "Likes en posts",
              data: [500, 120, 450, 160, 250, 50],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.5,
            },
            {
              label: "Likes en rutinas",
              data: [20, 60, 150, 500, 25, 10],
              fill: false,
              borderColor: "rgb(21, 39, 16)",
              tension: 0.5,
            },
            {
              label: "Likes en recetas",
              data: [150, 50, 120, 200, 170, 30],
              fill: false,
              borderColor: "rgb(252, 161, 59)",
              tension: 0.5,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              max: 1000,
            },
          },
        },
      });

      new Chart(chartFollows.current, {
        type: "line",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
          datasets: [
            {
              label: "Seguidores",
              data: [20, 50, 45, 60, 65, 67],
              fill: false,
              borderColor: "rgb(220, 116, 0)",
              tension: 0.5,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              suggestedMax: null,
            },
          },
          plugins: {
            title: {
              display: false,
            },
          },
        },
      });

      new Chart(chartCategory.current, {
        type: "pie",
        data: {
          labels: ["Dulces", "Verduras", "Pescado", "Carne", "Cocido"],
          datasets: [
            {
              data: [20, 10, 15, 30, 25],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#33FF99",
                "#9966FF",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#33FF99",
                "#9966FF",
              ],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
        },
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-2/4">
          <h2 className="text-center text-3xl mb-4 underline">Likes</h2>
          <div className="h-96">
            <canvas ref={chartRef} />
          </div>
        </div>
        <div className="w-2/4">
          <h2 className="text-center text-3xl mb-4 underline">Seguidores</h2>
          <div className="h-96">
            <canvas ref={chartFollows} />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-2/4 mt-4">
          <h2 className="text-center text-3xl mb-4 underline">
            Categorias más usadas
          </h2>
          <div className=" h-96">
            <canvas ref={chartCategory} />
          </div>
        </div>
        <div className="w-2/4 mt-12 flex justify-center h-auto">
          <div className="max-w-sm bg-orange-100 px-6 pt-6 pb-2 rounded-xl shadow-lg">
            <h3 className="mb-3 text-xl font-bold text-orange-600">
              Impulsa tu cuenta
            </h3>
            <div className="relative">
              <img
                className="w-full rounded-xl"
                src="/boost_account.jpg"
                alt="Colors"
              />
              <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                49,95€
              </p>
              <p className="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">
                60% descuento
              </p>
            </div>
            <h1 className="mt-4 text-gray-800 text-2xl font-bold">
              Haz que tu cuenta pegue el salto a las nubes
            </h1>
            <div className="my-4">
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <p>En menos de 24 horas notaras los cambios</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <p>Grantizamos más de 200 seguidores</p>
              </div>
              <div className="flex space-x-1 items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-600 mb-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </span>
                <p>¡Quedaras satisfecho!</p>
              </div>
              <button
                className="mt-4 text-xl w-full text-white bg-orange-600 py-2 rounded-xl shadow-lg"
                onClick={handleClick}
              >
                ¡Contratar!
              </button>

              {modal && <Stripe modal={modal} handleClick={handleClick} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
