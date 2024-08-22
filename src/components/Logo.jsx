import { memo } from 'react'
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Logo = ({ className }) => {
  const { auth } = useAuth();
  return (
    <NavLink to={auth?.username ? "/main" : "/"}>
      <h1 className={`${className} font-semibold`}>
        <span className="text-blue-500">Ar</span>ti.
      </h1>
    </NavLink>
  );
};

export default memo(Logo);
