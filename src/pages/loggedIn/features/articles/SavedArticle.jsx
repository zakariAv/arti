import { useMemo } from 'react'
import { motion } from 'framer-motion'
import ArticlePicture from '../../../../components/user/ArticlePicture'
import { useNavigate, Link } from 'react-router-dom'
import { BiSolidLike, BiSolidDislike, BiLike, BiDislike } from 'react-icons/bi'
import getAuthUserId from '../../../../utils/getAuthUserId'
import Owner from './Owner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'




const SavedArticle = ({ article, id }) => {

    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const userId = getAuthUserId()

    const likeExisted = useMemo(() => article?.likes.some(like => like === userId), [article, userId]);
    const dislikeExisted = useMemo(() => article?.dislikes.some(dislike => dislike === userId), [article, userId]);

    const { isPending, mutate } = useMutation({
        mutationKey: ['unsave-article'],
        mutationFn: () => {
            return axiosPrivate.delete(`/savedBlogs/${id}`)
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(data.data.message)
            queryClient.invalidateQueries('saved-articles')
        }
    })

    return (
        <motion.article initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className='border-2 my-2 bg-white dark:bg-transparent  border-slate-300 h-fit ' >
            {
                article.picture && <div className='w-full h-auto border border-slate-400  bg-light dark:bg-gray-800 shadow-smooth'>
                    <ArticlePicture path={article.picture} />
                </div>
            }
            < div className='pt-2 px-2' >
                <h1 className='text-base sm:text-lg md:text-xl font-semibold first-letter:capitalize break-words'>
                    <Link to={`/main/articles/${article._id}`} className='inline hover:text-blue-700 dark:hover:text-blue-500 transition-colors'>
                        {article.title}
                    </Link>
                </h1>
                <div className="flex items-center justify-between text-[10px]  sm:text-xs md:text-sm mt-0.5">
                    <span className="capitalize text-slate-500 md:text-sm">
                        {article.category.name}
                    </span>
                    <span className="rounded-2xl border border-slate-500 px-1 py-0.5 text-[8px] sm:text-[10px] md:text-xs font-semibold ">
                        {article.privacy ? "Private" : "Public"}
                    </span>
                </div>
            </div >
            <div className='ps-1 m-1'>
                <div className=' text-[10px] sm:text-[10px] md:text-sm bg-white dark:bg-transparent text-[#2c2c2c] dark:text-light p-1 first-letter:capitalize'>
                    <p className='inline break-words'>{article.body.substring(0, 300)} ...</p>
                    {article.body.length > 300 &&
                        <Link to={`/main/articles/${article._id}`}
                            className=' inline text-blue-500 hover:text-blue-800 transition-colors'>
                            Continue reading
                        </Link>
                    }
                </div>
                <div className='flex justify-between items-center py-1  text-base md:text-lg'>
                    <div className='flex items-center gap-2'>
                        <div onClick={() => navigate(`/main/articles/${article._id}`)} className=' flex items-center gap-0.5'>
                            <span>{article.likes.length}</span>
                            {likeExisted ? <BiSolidLike className='text-blue-500' /> : <BiLike />}
                        </div>
                        <div onClick={() => navigate(`/main/articles/${article._id}`)} className='flex items-center gap-0.5'>
                            <span>{article.dislikes.length}</span>
                            {dislikeExisted ? <BiSolidDislike className='text-blue-500' /> : <BiDislike />}
                        </div>
                    </div>
                    <button onClick={mutate} disabled={isPending} className='text-xs sm:text-sm  font-medium py-0.5 px-1 rounded-xl text-light bg-pink-500'>
                        UnSave
                    </button>

                </div>
                <div className='flex justify-between items-center'>
                    <Owner user={article.user} />
                    <div className='text-[8px] sm:text-sm italic'>
                        {article.comments.length} comments
                    </div>
                </div>



            </div>
        </motion.article >
    )
}

export default SavedArticle