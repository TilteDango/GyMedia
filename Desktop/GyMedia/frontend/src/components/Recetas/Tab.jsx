function Tab({ children, active, changeActive }) {
  const cssname = active
    ? "text-gray-500 py-2 px-4 border-b-2 hover:text-gray-800 focus:outline-none border-orange-500"
    : "text-gray-500 py-2 px-4 border-b-2 border-transparent hover:text-gray-800 hover:border-orange-500 focus:outline-none";

  return <button className={cssname} onClick={changeActive}>{children}</button>;
}

export default Tab;
