import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from '../../hooks/useLogout'
import ProfilePicture from "../user/ProfilePicture";

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { auth } = useAuth();
  const logout = useLogout();


  const DropdownLink = ({ path, text }) => {
    return (
      <Link
        onClick={() => setShowDropdown(false)}
        to={path}
        className="block px-4 py-2 text-[10px] hover:bg-gray-100 dark:hover:bg-gray-700 md:text-sm"
      >
        {text}
      </Link>
    );
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex-center w-full gap-x-0.5 rounded-md bg-white p-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-light sm:gap-x-1.5 sm:text-sm md:px-3 md:py-2"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex items-center gap-2 ">
            <ProfilePicture image={auth.profile} className='h-5 w-5 rounded-full' />
            <span className="text-[10px] md:text-base">{auth?.username}</span>
          </div>
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md border bg-white text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:text-light"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <DropdownLink path="/main/profile" text="Account settings" />
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-left text-[10px] md:text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-3"
              >

                Sign out
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
