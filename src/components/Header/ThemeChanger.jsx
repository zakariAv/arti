import useTheme from "../../hooks/useTheme";
import Button from "../UI/Button";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoIosSunny } from "react-icons/io";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const changeMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Button
      onClick={changeMode}
      className="rounded-full p-1 text-sm dark:bg-transparent md:text-xl"
    >
      {theme === "dark" ? (
        <BsFillMoonStarsFill className="animate-pulse" />
      ) : (
        <IoIosSunny className="scale-110 animate-pulse" />
      )}
    </Button>
  );
};

export default ThemeChanger;
