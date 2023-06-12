import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

export default function PostHeader({ creator }) {
  const { getUserInfo } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    async function getInfo() {
      const userInfo = await getUserInfo(creator);
      setUserInfo(userInfo);
    }
    getInfo();
  }, []);

  return (
    <div className="flex items-center px-4 py-3">
      <img className="h-8 w-8 rounded-full" src={userInfo.image} />
      <div className="ml-3 ">
        <span className="text-sm font-semibold antialiased block leading-tight">
          {userInfo.username}
        </span>
        <span className="text-gray-600 text-xs block">
          Asheville, North Carolina
        </span>
      </div>
    </div>
  );
}
