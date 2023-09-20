import React, { useEffect } from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { getToken, removeToken } from "../LocalStorage";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { FiLogOut } from "react-icons/fi";
import axios from "../axios";


const Navbar = () => {
  const navigate = useNavigate();
  const { setauthToken, userData, setuserData} = useStateContext();

  const logOut = async () => {
    try {
      const res = await signOut(auth);
      removeToken();
      const yash=getToken();
      setauthToken(yash);
      setuserData(null);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMyResult = async () => {
    try {
      const res = await axios.get("/userss/");
      {res.data && res.data.forEach(element => {
        if(element.user_id === auth.currentUser.uid){
          setuserData(element);
        }
        {userData && console.log( userData)};
      });}
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyResult();
  },[]);

  const handleLogOut =()=>{
    logOut();
  }
  return (
    <div className="flex justify-between px-5 bg-white">
      <div className="flex divide-x">
        <div className="p-2">
          <div className="text-md font-semibold px-2 text-gray-400">Your organization</div>
          <div className="font-bold px-2">fawr bsol</div>
        </div>
        <div className="text-gray-600 grid place-items-center px-5"><AiOutlineSearch className="h-5 w-5"/></div>
      </div>
      <div className="flex place-items-center gap-5">
      <button onClick={handleLogOut} className="border text-gray-800 hover:bg-gray-100 flex font-bold text-sm gap-3 place-items-center px-6 py-1 rounded-md"
          >Log out <FiLogOut/></button>
        <div><AiOutlinePlus className="h-8 w-8 rounded-full p-2 bg-[#FFD700]"/></div>
        <div><IoMdNotificationsOutline className="h-8 w-8 rounded-full p-2 bg-gray-300"/></div>
        <div><img className="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" /></div>
      </div>
    </div>
  );
};

export default Navbar;
