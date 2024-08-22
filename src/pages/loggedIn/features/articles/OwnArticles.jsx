import { memo } from 'react'
import useGetData from '../../../../hooks/useGetData'
import Spinner from '../../../../components/UI/Spinner'
import ArticleCard from './ArticleCard'
import ErrorPage from '../../shared/ErrorPage'

const OwnArticles = ({ id }) => {

    const { isLoading, data: articles, isError, error } = useGetData({ key: ['own-articles', id], url: `/blogs/userBlogs/${id}` })
    if (isLoading) return <Spinner />
    if (isError) return <ErrorPage message={error.response.data.message || error.message} />

    return (

        <>
            {articles.length ? articles.map(article => <ArticleCard key={article._id} article={article} />) :
                <p className='text-center text-lg italic '>There is no articles related</p>
            }

        </>
    )
}

export default memo(OwnArticles)