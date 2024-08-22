import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  const NavbarLink = ({ path, text }) => {
    return (
      <NavLink
        to={path}
        onClick={() => setIsOpen(false)}
        className={`relative font-medium transition-all hover:text-blue-500 sm:before:absolute
           sm:before:-bottom-1 sm:before:left-0 sm:before:h-[2px] sm:before:w-0 sm:before:bg-blue-500 sm:before:hover:w-full ${location.pathname === path && "text-blue-500 sm:before:w-full"}`}
      >
        {text}
      </NavLink>
    );
  };

  const NavLinks = () => {
    return (
      <>
        <NavbarLink path="/" text="Home" />
        <NavbarLink path="/register" text="Register" />
        <NavbarLink path="/public-articles" text="Public Articles" />
      </>
    );
  };


  return (
    <>
      <nav>
        <div className="hidden gap-x-3 sm:flex">
          <NavLinks />
        </div>
        <div className="text-2xl sm:hidden">
          <button onClick={toggleNavbar}>
            <FontAwesomeIcon
              icon={faNavicon}
              className={`${isOpen && "rotate-180 text-blue-500"} transition-all`}
            />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: 200, opacity: 0 }}
            className="fixed left-0 top-12 flex w-full flex-col items-center gap-y-5 bg-silver py-5 shadow-md"
          >
            <NavLinks />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
