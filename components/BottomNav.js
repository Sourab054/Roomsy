import React from "react";
import { FiHome, FiHeart, FiUser } from "react-icons/fi";
import { BiDoorOpen } from "react-icons/bi";
import { useRouter } from "next/router";

const BottomNav = () => {
  const route = useRouter();
  return (
    <nav className="flex items-center fixed w-full z-50 bottom-0 justify-between bg-white dark:bg-dark p-4 sm:hidden">
      <div className="flex flex-col items-center space-y-2">
        <FiHome size={20} color={route.pathname == "/" ? "#FF002E" : ""} />
        <span className="text-sm">Home</span>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <FiHeart size={20} />
        <span className="text-sm">Wishlist</span>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <BiDoorOpen size={22} />
        <span className="text-sm">Stays</span>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <FiUser size={20} />
        <span className="text-sm">Profile</span>
      </div>
    </nav>
  );
};

export default BottomNav;
