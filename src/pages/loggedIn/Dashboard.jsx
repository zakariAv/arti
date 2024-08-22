import ErrorPage from '../loggedIn/shared/ErrorPage'
import TotalItemsBox from '../../components/Dashboard/TotalItemBox'
import { FaUsers } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { PiArticleDuotone } from "react-icons/pi";
import UsersChart from '../../components/Dashboard/UsersChart';
import useGetData from '../../hooks/useGetData';
import ArticlesChart from '../../components/Dashboard/ArticlesChart';
import TopFiveUsers from '../../components/Dashboard/TopFiveUsers';
import ReportsList from '../../components/Dashboard/ReportsList';


const Dashboard = () => {

  const { data, isLoading: isLoading, isError, error } = useGetData({ url: '/auth/getCounts', key: ['Counts'] })

  if (isError) return <ErrorPage message={error?.response?.data?.message || error?.message} />



  return (
    <>
      <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 md:grid-cols-4">
        <TotalItemsBox
          text="Users"
          isLoading={isLoading}
          num={data?.allUsers}
          icon={<FaUsers />}
        />

        <TotalItemsBox
          text="Categories"
          isLoading={isLoading}
          num={data?.categoriesCount}
          icon={<MdOutlineCategory />}
        />

        <TotalItemsBox
          text="Articles"
          isLoading={isLoading}
          num={data?.allArticles}
          icon={<GrArticle />}
        />

        <TotalItemsBox
          text="Public Articles"
          isLoading={isLoading}
          num={data?.publicArticles}
          icon={<PiArticleDuotone />}
        />
      </div>

      {/* charts  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 border-t-2 border-slate-300">
        <UsersChart isLoading={isLoading} admins={data?.admins} editors={data?.editors} users={data?.users} />
        <ArticlesChart isLoading={isLoading} publicArticles={data?.publicArticles} privateArticles={data?.privateArticles} />
        <TopFiveUsers isLoading={isLoading} topUsers={data?.topUsers} />
      </div>

      <ReportsList />

    </>
  );
}

export default Dashboard