import React from "react";
import Nav from "./Nav";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 z-50 w-full max-w-[1550px] bg-silver  shadow-md">
      <div className="mx-7 flex items-center justify-between py-2 sm:mx-auto sm:w-11/12 md:py-3 lg:w-8/12">
        <Logo className='text-xl sm:text-2xl lg:text-3xl' />
        <Nav />
        <Button
          onClick={() => navigate("/login")}
          title='Login'
          size="md"
          variant="primaryReverse"
          className="hidden sm:block"
        >
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
