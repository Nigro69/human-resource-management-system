import React from "react";
import { NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { links } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex place-items-center px-3 py-2 text-black rounded-md gap-5 mx-3 text-md font-semibold my-1";
  const normalLink =
    "flex place-items-center px-3 py-2 rounded-md gap-5 mx-3 text-md font-semibold hover:bg-gray-600 hover:text-gray-800 text-gray-400 my-1";

  return (
    <div
      className="bg-[#020202] h-screen overflow-hidden hover:overflow-auto "
    >
        <>
          <div className="flex place-items-center mx-8">
            <div><SiShopware className="text-[#FFD700] p-2 h-12 w-12"/></div>
            <div className="text-white text-3xl font-semibold p-2">fawr</div>
          </div>
          <div className="">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-600 tracking-widest font-semibold text-md p-2 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
    </div>
  );
};

export default Sidebar;
