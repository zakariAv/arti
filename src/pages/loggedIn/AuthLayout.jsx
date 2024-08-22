import React, { useState } from "react";
import AuthHeader from "../../components/Header/AuthHeader";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";



const AuthLayout = () => {

  const [openNav, setOpenNav] = useState(true);
  const location = useLocation()

  window.onresize = () => {
    if (window.innerWidth >= 1023) {
      setOpenNav(true)
    }
  }

  return (
    <div className="dark:bg-gray-800 dark:text-light">
      <AuthHeader openNav={openNav} setOpenNav={setOpenNav} />
      <section className="flex h-[calc(100vh-44px)] sm:h-[calc(100vh-52px)] md:h-[calc(100vh-73px)]">
        {openNav && <Sidebar />}
        <section id='main' className={`dark:bg-gradientDark flex-1  min-h-full  ${location.pathname === '/main/articles' ? 'overflow-y-hidden' : 'overflow-y-scroll scrollbar-[5px] sm:scrollbar-thin scrollbar-thumb-[#90aaf8] scrollbar-track-[#f1f1f1]'}`}>
          <Outlet />
        </section>
      </section>
    </div>
  );
};

export default AuthLayout;
