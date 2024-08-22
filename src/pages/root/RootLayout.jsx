import useTheme from "../../hooks/useTheme";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";


const RootLayout = () => {
  
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      setTheme('light')
    }
  }, [theme])

  return (
    <>
      <Header />
      <section className="mt-12 bg-silver sm:mt-[64px] md:px-[4rem] lg:px-[8rem]">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default RootLayout;
