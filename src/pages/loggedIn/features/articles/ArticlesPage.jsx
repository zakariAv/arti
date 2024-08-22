import React, { useEffect } from 'react'
import Spinner from '../../../../components/UI/Spinner'
import ErrorPage from '../../shared/ErrorPage'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import useGetInfiniteQuery from '../../../../hooks/useGetInfiniteQuery'
import { ToastContainer } from 'react-toastify'
import ArticleCard from './ArticleCard'



const ArticlesPage = () => {

  const { ref, inView } = useInView();
  const {
    isLoading,
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteQuery({ url: '/blogs', key: ['articles'] })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isLoading) return <Spinner />

  if (isError) return <ErrorPage message={error.response.data.message || error.message} />


  return (
    <>
      <ToastContainer />
      <div className="h-full overflow-y-scroll bg-silver scrollbar-thin scrollbar-track-[#f1f1f1] scrollbar-thumb-[#90aaf8] dark:bg-gradientDark">
        <div className="mt-2 lg:mt-5 md:mt-7 p-0.5 sm:p-1 md:p-3 grid h-fit w-full max-w-[600px] grid-cols-1 gap-6 shadow-2xl sm:mx-auto sm:w-9/12">
          {
            data?.pages?.every(page => page.data.length === 0) ?
              // No articles to display
              (<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }} className='h-44 flex-center'>
                <p className='text-lg'>There is no articles to display!</p>
              </motion.div>) :
              data?.pages?.map((group, i) => (
                <React.Fragment key={i}>
                  {group.data.map((article) => (
                    <ArticleCard
                      key={article._id}
                      innerRef={ref}
                      article={article}
                    />))
                  }
                </React.Fragment>
              ))
          }
          {isFetchingNextPage && <Spinner />}
        </div>
      </div>


    </>
  );
}

export default ArticlesPage


