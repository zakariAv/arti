import { useQuery } from "@tanstack/react-query";
import axios from "../../services/api/axios";
import Spinner from "../../components/UI/Spinner";
import ErrorPage from "../loggedIn/shared/ErrorPage";
import ArticleCard from "../loggedIn/features/articles/ArticleCard";

const PublicArticles = () => {

  const { isLoading, data: articles, isError, error } = useQuery({
    queryKey: ['public-articles'],
    queryFn: () => {
      return axios.get('/blogs/public-articles')
    },
    select: (data) => {
      return data.data;
    },
  })

  if (isLoading) return <div className=" h-screen flex-center"><Spinner /></div>
  if (isError) return <div className=" h-screen flex-center">
    <ErrorPage message={error.response.data.message || error.message} />
  </div>

  if (!articles.length) {
    return <div className=" h-screen flex-center">
      <p className="text-2xl md:text-3xl font-semibold ">There is no public articles to show!</p>
    </div>
  }

  return <div className="bg-white">
    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-center py-2 md:py-3 lg:py-4">
      Public Articles
    </h2>
    <div className="w-full sm:w-3/4 md:w-9/12 lg:w-1/2 mx-auto">
      {articles.map(article => <ArticleCard key={article._id} article={article} />)}
    </div>
  </div>;
};

export default PublicArticles;
