import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import RSidebar from "./RSidebar";

function Layout({ children }) {
  return (
    <div className="flex relative">
      <div className="w-52 fixed dark:bg-secondary-dark-bg ">
        <Sidebar />
      </div>
      <div className="min-h-full ml-52 w-full ">
        <div className="sticky bg-white border top-0 w-full ">
          <Navbar />
        </div>
        <div className="flex">
          <div className="w-full  mr-14">{children}</div>
          <div className="fixed right-0 h-full w-14">
            <RSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
