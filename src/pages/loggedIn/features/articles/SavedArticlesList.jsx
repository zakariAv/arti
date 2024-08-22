import useGetData from '../../../../hooks/useGetData'
import ErrorPage from './../../shared/ErrorPage'
import Spinner from '../../../../components/UI/Spinner'
import SavedArticle from './SavedArticle'
import { ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'
const SavedArticlesList = () => {

    const { isLoading, data: savedArticles, isError, error } = useGetData({ key: ['saved-articles'], url: '/savedBlogs' })

    const renderenArticle = savedArticles?.map(savedArticle => <SavedArticle key={savedArticle._id} article={savedArticle.blog} id={savedArticle._id} />)

    return (

        isLoading ? <Spinner /> :
            isError ? <ErrorPage message={error.response.data.message || error.message} /> :
                <>
                    <ToastContainer />
                    {!savedArticles.length ? <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }}
                        className='flex-center h-full text-lg md:text-2xl lg:text-3xl'>
                        No Articles Found!
                    </motion.div> :
                        <div className='h-full'>
                            <div className='w-full p-1 sm:w-9/12 max-w-[600px] sm:mx-auto h-full shadow-md grid grid-cols-1'>
                                {renderenArticle}
                            </div>
                        </div>
                    }

                </>
    )
}

export default SavedArticlesList