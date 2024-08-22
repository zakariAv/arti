
import Logo from "../Logo";
import Dropdown from "../Header/Dropdown";
import ThemeChanger from "../Header/ThemeChanger";
import SidebarToggler from "../Sidebar/SidebarToggler";
import Title from "./Title";
import getMoment from "../../services/api/moment";


const AuthHeader = ({ openNav, setOpenNav }) => {


  return (
    <header className="z-50 flex border-b bg-silver shadow-md dark:bg-gray-800">
      <div className="flex items-center border-e gap-x-[1.5px] px-1 md:w-64">
        <SidebarToggler openNav={openNav} setOpenNav={setOpenNav} />
        <div className="mx-auto grid place-content-center">
          <Logo className='text-sm sm:text-lg md:text-3xl' />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end sm:justify-between p-1 sm:p-2 md:p-3">
        <div className="hidden sm:flex flex-col">
          <Title />
          <span className="text-xs md:text-sm">{getMoment()}</span>
        </div>
        <div className="flex items-center gap-x-1 p-1 md:gap-x-2">
          <div className="text-[8px] md:text-lg">
            <Dropdown />

          </div>
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
