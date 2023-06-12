import React from "react";

export default function Description({ name, onUserUpdate }) {
  const handleInputChange = (e) => {
    onUserUpdate(name, e.target.value);
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Descripción*
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Escribe una breve descripción (Tenga en cuenta que es lo que primero se verá)"
        required
        onChange={handleInputChange}
      />
    </div>
  );
}
