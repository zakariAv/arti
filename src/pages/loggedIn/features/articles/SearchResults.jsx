import React from 'react'
import Spinner from '../../../../components/UI/Spinner'
import ArticleCard from './ArticleCard'
import ErrorPage from '../../shared/ErrorPage'

const SearchResults = ({ queryApi }) => {
    const { isLoading, data: articles, isError, error } = queryApi

    if (isLoading) return <Spinner />

    if (isError) return <ErrorPage message={error.response.data.message || error.message} />


    if (!articles?.length) return <div className='h-full flex-center bg-silver dark:bg-transparent'>
        <p className='text-sm md:text-base lg:text-lg p-2 shadow-smooth  bg-blue-500/20  '>No results found!</p>
    </div>

    return <div className='w-full p-1 sm:w-9/12 max-w-[600px] sm:mx-auto h-full shadow-md grid grid-cols-1'>
        {articles.map(article => <ArticleCard key={article._id} article={article} />)}
    </div>


}

export default SearchResults