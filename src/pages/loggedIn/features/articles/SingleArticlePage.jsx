import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BiLike, BiDislike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { TbEditCircle } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Owner from './Owner';
import { motion } from 'framer-motion'
import Button from '../../../../components/UI/Button'
import validateIdURL from '../../../../utils/validateIdURL'
import useGetData from '../../../../hooks/useGetData'
import Spinner from '../../../../components/UI/Spinner'
import ErrorPage from '../../shared/ErrorPage'
import ArticlePicture from '../../../../components/user/ArticlePicture'
import AddComment from './AddComment';
import CommentsList from './CommentsList'
import { ToastContainer } from 'react-toastify';
import AddLike from './AddLike';
import AddDisLike from './AddDisLike';
import getAuthUserId from '../../../../utils/getAuthUserId';
import LikesModal from '../../../../components/modals/LikesModal';
import DislikesModal from '../../../../components/modals/DislikesModal';
import SaveArticle from './SaveArticle';
import EditArticleModal from '../../../../components/modals/EditArticleModal';
import DeleteArticleModal from '../../../../components/modals/DeleteArticleModal';
import ReportArticle from './ReportArticle';
import ReportArticleModal from '../../../../components/modals/ReportArticleModal';
import useAuth from '../../../../hooks/useAuth';

const SingleArticlePage = () => {

    const { id } = useParams()
    const userId = getAuthUserId()
    const role = useAuth().auth?.role

    const [showLikesModal, setShowLikesModal] = useState(false)
    const [showDislikesModal, setShowdislikesModal] = useState(false)
    const [showEditArticleModal, setShowEditArticleModal] = useState(false)
    const [showDelArticleModal, setShowDelArticleModal] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)

    if (!validateIdURL(id)) return <ErrorPage message='Invalid ID passed' />

    const { isLoading, data: article, isError, error } = useGetData({ key: ['article', id], url: `/blogs/getArticle/${id}` })

    const likeExisted = useMemo(() => article?.likes.some(like => like._id === userId), [article, userId]);
    const dislikeExisted = useMemo(() => article?.dislikes.some(dislike => dislike._id === userId), [article, userId]);


    return (
        isLoading ? <Spinner /> :
            isError ? <ErrorPage message={error.response.data.message || error.message} /> :
                <>
                    <ToastContainer />
                    {showLikesModal && <LikesModal likes={article.likes} closeModal={() => setShowLikesModal(!showLikesModal)} />}
                    {showDislikesModal && <DislikesModal dislikes={article.dislikes} closeModal={() => setShowdislikesModal(!showDislikesModal)} />}
                    {showEditArticleModal && <EditArticleModal article={article} closeModal={() => setShowEditArticleModal(!showEditArticleModal)} />}
                    {showDelArticleModal && <DeleteArticleModal id={article._id} closeModal={() => setShowDelArticleModal(!showDelArticleModal)} />}
                    {showReportModal && <ReportArticleModal articleId={article._id} closeModal={() => setShowReportModal(!showReportModal)} />}
                    <div className=' w-full mt-2  sm:w-9/12 max-w-[600px] sm:mx-auto'>
                        <div className='flex justify-between items-center my-1 sm:my-3 px-3'>
                            <Button onClick={() => setShowEditArticleModal(!showEditArticleModal)}
                                title='Edit article'
                            >
                                <TbEditCircle className=' text-base sm:text-xl md:text-3xl' />
                            </Button>
                            <Button onClick={() => setShowDelArticleModal(!showDelArticleModal)}
                                variant='danger'
                                title='Delete article'>
                                <MdDelete className=' text-base sm:text-xl md:text-3xl' />
                            </Button>
                        </div>
                        <motion.article initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='border-2 bg-white dark:bg-transparent border-slate-300 mx-1 mb-36 '>
                            {article.picture && <div className='w-full h-auto border border-slate-400  bg-light dark:bg-gray-800 shadow-smooth'>
                                <ArticlePicture path={article.picture} />
                            </div>}
                            <div className='pt-2 px-2'>
                                <h1 className='text-base sm:text-lg md:text-xl font-semibold first-letter:capitalize break-words'>
                                    {article.title}
                                </h1>
                                <div className="flex items-center justify-between mt-0.5">
                                    <span className="text-xs capitalize text-slate-500 md:text-sm">
                                        {article.category.name}
                                    </span>
                                    <span className="rounded-2xl border border-slate-500 px-1 py-0.5 text-xs font-semibold sm:text-sm">
                                        {article.privacy ? "Private" : "Public"}
                                    </span>
                                </div>
                            </div>
                            <div className='ps-1 m-1'>
                                <div className='text-sm bg-white dark:bg-transparent text-[#2c2c2c] dark:text-light p-1 first-letter:capitalize'>
                                    <p className='inline break-words'>{article.body}</p>
                                </div>
                                <div className='flex justify-between items-center py-1  text-base md:text-lg'>
                                    <div className='flex items-center gap-2'>
                                        <button title='show likes' className='flex items-center hover:text-cyan-500 hover:scale-110 transition-all ' onClick={() => setShowLikesModal(!showLikesModal)}>
                                            {article.likes.length}
                                            {likeExisted ? <BiSolidLike className='text-blue-500' /> : <BiLike />}
                                        </button>
                                        <button title='show dislikes' className='flex items-center hover:text-cyan-500 hover:scale-110 transition-all ' onClick={() => setShowdislikesModal(!showDislikesModal)}>
                                            {article.dislikes.length}
                                            {dislikeExisted ? <BiSolidDislike className='text-blue-500' /> : <BiDislike />}
                                        </button>
                                    </div>
                                    {article.isSaved ?
                                        <p className='flex items-center gap-1 p-0.5 sm:p-1 text-green-500 text-xs  sm:text-sm border border-green-500'><FaCheck />Saved</p>
                                        : <SaveArticle isSaved={article.isSaved} articleId={article._id} />}
                                </div>
                                <div className='my-1 flex justify-between items-center '>
                                    <div className='flex items-center gap-1 font-semibold'>
                                        <AddLike articleId={article._id} likeExisted={likeExisted} />
                                        <AddDisLike articleId={article._id} dislikeExisted={dislikeExisted} />
                                    </div>
                                    {(role === 2001) && <ReportArticle articleId={article._id} showReportModal={() => setShowReportModal(!showReportModal)} />}
                                </div>
                                <div className='flex justify-between items-center'>
                                    <Owner user={article.user} />
                                    <div className='text-[10px] sm:text-sm italic px-1'>
                                        {article.comments.length} comments
                                    </div>
                                </div>

                                <AddComment articleId={article._id} />
                                <CommentsList comments={article.comments} articleId={article._id} />
                            </div>
                        </motion.article>
                    </div>
                </>
    )
}

export default SingleArticlePage