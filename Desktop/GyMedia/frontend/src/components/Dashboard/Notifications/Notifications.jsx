import React from "react";

export default function Notifications() {
  return (
    <div className="overflow-x-auto w-2/4 m-auto">
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50"></thead>
        <tbody className="text-sm divide-y divide-gray-100">
          <tr>
            <td className="p-2 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                  <img
                    className="rounded-full"
                    src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                    width="40"
                    height="40"
                    alt="Alex Shatov"
                  />
                </div>
                <div className="font-medium text-gray-800">Alex Shatov</div>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left">
                Le ha dado "Me gusta" a tu publicación
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left font-medium text-green-500">
                Recetas
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                  <img
                    className="rounded-full"
                    src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg"
                    width="40"
                    height="40"
                    alt="Philip Harbach"
                  />
                </div>
                <div className="font-medium text-gray-800">Philip Harbach</div>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left">Te ha empezado a seguir</div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left font-medium text-green-500">
                $2,767.04
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                  <img
                    className="rounded-full"
                    src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg"
                    width="40"
                    height="40"
                    alt="Mirko Fisuk"
                  />
                </div>
                <div className="font-medium text-gray-800">Mirko Fisuk</div>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left">mirkofisuk@gmail.com</div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left font-medium text-green-500">
                $2,996.00
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                  <img
                    className="rounded-full"
                    src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg"
                    width="40"
                    height="40"
                    alt="Olga Semklo"
                  />
                </div>
                <div className="font-medium text-gray-800">Olga Semklo</div>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left">olga.s@cool.design</div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left font-medium text-green-500">
                $1,220.66
              </div>
            </td>
          </tr>
          <tr>
            <td className="p-2 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                  <img
                    className="rounded-full"
                    src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                    width="40"
                    height="40"
                    alt="Burak Long"
                  />
                </div>
                <div className="font-medium text-gray-800">Burak Long</div>
              </div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left">longburak@gmail.com</div>
            </td>
            <td className="p-2 whitespace-nowrap">
              <div className="text-left font-medium text-green-500">
                $1,890.66
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
