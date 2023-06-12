import React from 'react'
import Logo from '../Logo'

export default function MobileNav() {
  return (
    <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="mr-auto text-3xl font-bold leading-none"
              to="/home"
            >
             < Logo />
            </NavLink>
            <button className="navbar-close">
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/home"
                >
                  Inicio
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/ejercicios"
                >
                  Ejercicios
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/dietas"
                >
                  Dietas
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/herramientas"
                >
                  Herramientas
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/estadisticas"
                >
                  Estadísticas
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              {token ? (
                <p>Token disponible en localStorage</p>
              ) : (
                <>
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    className="block px-4 py-3 mb-3  text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                    to="/registro"
                  >
                    Registrarse
                  </NavLink>
                  <NavLink
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                    to="/inicio"
                  >
                    Iniciar Sesión
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
  )
}
