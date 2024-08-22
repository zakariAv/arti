import { memo } from 'react'
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

const SidebarToggler = ({ openNav, setOpenNav }) => {
  return (
    <button
      onClick={() => setOpenNav(!openNav)}
      className={` ${openNav ? "bg-blue-500" : "bg-blue-950"} h-fit rounded-full p-1 text-xs sm:text-lg md:text-2xl lg:text-3xl text-light lg:hidden`}
    >
      {openNav ? <FaAnglesLeft /> : <FaAnglesRight />}
    </button>
  );
};

export default memo(SidebarToggler);
