export function LogInInput({
  type,
  name,
  id,
  placeholder,
  children,
  user,
  onUserUpdate,
}) {
  const handleInputChange = (e) => {
    onUserUpdate(name, e.target.value);
  };
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        {children}
      </label>

      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required=""
        onChange={handleInputChange}
      />
    </div>
  );
}

{
  /* Por si quiero hacer después validaciones */
}
{
  /* <p className="text-xs italic text-red-500 hidden">Please choose a password.</p> */
}
