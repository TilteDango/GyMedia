import MgButton from "../Buttons/MgButton";
import Review from "./Review";
import DietButton from "../Buttons/DietButton";
import Category from "./Category";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function DietCard({ dieta }) {
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const {
    img,
    username,
    category,
    title,
    description,
    stars,
    reviews,
    liked,
    _id,
    created,
  } = dieta;

  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:6001/api/user/getInfoByUsername/" + username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        return res.json();
      });
      setSelectedUser(response._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white m-4">
      <div className="w-full md:w-1/3 bg-white grid place-items-center">
        <img src={img} alt="imagen de cabecera" className="rounded-xl" />
      </div>
      <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
        <div className="flex justify-between item-center">
          <Link
            to="/user-profile"
            className="text-gray-500 font-medium hidden md:block"
            onClick={handleClick}
          >
            @{username}
          </Link>
          <MgButton isLiked={liked} _id={_id} />
          <Review stars={stars} reviews={reviews} />

          <Category category={category} />
        </div>
        <h3 className="font-black text-gray-800 md:text-3xl text-xl">
          {title}
        </h3>
        <p className="md:text-lg text-gray-500 text-base mb-7">{description}</p>
        <div className={created ? "  w-3/4 m-auto flex" : "m-auto"}>
          <DietButton diet={dieta} />
        </div>
      </div>
    </div>
  );
}

export default DietCard;
