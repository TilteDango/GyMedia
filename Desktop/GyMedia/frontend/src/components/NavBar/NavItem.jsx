import { NavLink } from "react-router-dom";

function NavItem({ path, children }) {

  let activeStyle = {
    color: 'rgb(249, 115, 22)',
    opacity: '1',
    fontWeight: '700'

  };

    return (
        <li>
            <NavLink style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
              className="text-sm text-gray-400 hover:text-gray-500" to={path}>
              {children}
            </NavLink>
          </li>
    )
}

export default NavItem