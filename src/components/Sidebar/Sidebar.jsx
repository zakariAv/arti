

import { AnimatePresence, motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { GrArticle } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineSaveAs } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import SidebarLink from '../Sidebar/SidebarLink'



const Sidebar = () => {

  const role = useAuth().auth.role

  const isAdmin = (role === 5150 || role === 6000)
  const isEditor = (role === 1984)
  const isUser = (role === 2001)

  return (
    <AnimatePresence>

      <motion.aside
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ duration: 0.2 }}
        className="z-20 w-[60px] sm:w-[74px] border-e shadow-md md:w-64"
      >
        <div className="">
          {isAdmin && <>
            <SidebarLink path="/main" text="Dashboard" icon={<MdDashboard />} />
            <SidebarLink
              path="/main/users"
              text="Manage Users"
              icon={<FaUsersGear />}
            />
          </>
          }

          {(isEditor) && <SidebarLink
            path="/main/articles/reports"
            text="Users Reports"
            icon={<HiOutlineSaveAs />}
          />}

          {
            (isEditor || isAdmin) &&
            <>
              <SidebarLink
                path="/main/categories"
                text="Categories"
                icon={<MdOutlineCategory />}
              />
              <SidebarLink
                path="/main/articles/add-article"
                text="Add Article"
                icon={<RiArticleLine />}
              />
            </>
          }

          <SidebarLink
            path="/main/articles"
            text="Latest Articles"
            icon={<GrArticle />}
          />
          <SidebarLink
            path='/main/articles/search'
            text='Search Articles'
            icon={<IoMdSearch />}
          />
          <SidebarLink
            path="/main/articles/saved-articles"
            text="Saved Articles"
            icon={<HiOutlineSaveAs />}
          />






        </div>
      </motion.aside>

    </AnimatePresence>
  );
};

export default Sidebar;
