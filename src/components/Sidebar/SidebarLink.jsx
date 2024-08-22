
import { useLocation, NavLink } from "react-router-dom";

const SidebarLink = ({ path, icon, text }) => {
    const location = useLocation();
    return (
        <NavLink
            to={path}
            className={`${location.pathname === path && "bg-slate-200 text-blue-500 dark:text-light dark:bg-blue-900"} flex items-center gap-x-2 py-5 ps-5 text-center 
          font-medium transition-all hover:bg-slate-200 dark:hover:bg-blue-950 sm:ps-7 md:ps-12 md:text-lg `}
        >
            <span className="md:text-2xl">{icon}</span>
            <span className="hidden md:block">{text}</span>
        </NavLink>
    );
}

export default SidebarLink