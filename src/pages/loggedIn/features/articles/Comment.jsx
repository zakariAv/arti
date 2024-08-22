import ProfilePicture from '../../../../components/user/ProfilePicture'
import { Link } from 'react-router-dom'
import getAuthUserId from '../../../../utils/getAuthUserId'
import { TiDelete } from "react-icons/ti";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify'
import moment from 'moment'
import { motion } from 'framer-motion'

const Comment = ({ comment, articleId }) => {



    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const userId = getAuthUserId()

    const { mutate, isPending } = useMutation({
        mutationKey: ['deleteComment', userId],
        mutationFn: (commentId) => {
            return axiosPrivate.post('/blogs/removeComment', {
                blogId: articleId,
                commentId: commentId
            })
        },
        onSuccess: () => {
            toast.success('comment deleted successfully')
            queryClient.invalidateQueries(['article', articleId])



        }
    })

    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} key={comment?._id} className='flex gap-1 bg-slate-200 dark:bg-transparent border p-1 rounded-lg'>
            <div className='w-7 h-7 md:w-10 md:h-10'>
                <ProfilePicture image={comment?.postedBy?.profile} className='h-full w-full rounded-full object-cover shadow-smooth' />
            </div>
            <div className='grid grid-cols-1 flex-1'>
                <div className='flex justify-between items-center'>
                    <Link to={userId === comment?.postedBy?._id ? '/main/profile' : `/main/member/${comment?.postedBy?._id}`} className='hover:text-blue-700 text-[8px] sm:text-[10px] md:text-xs font-semibold '>
                        {comment?.postedBy?.firstName} {comment?.postedBy?.lastName}
                    </Link>
                    {userId === comment?.postedBy?._id &&
                        <button disabled={isPending} onClick={() => mutate(comment?._id)} title='Delete this comment' className='hover:text-red-600 scale-110 hover:scale-125 transition-all'>
                            <TiDelete />
                        </button>
                    }
                </div>
                <p className='text-[8px] sm:text-[10px] md:text-xs ps-0.5'>{comment?.text}</p>
                <span className='text-right w-full text-[6px] sm:text-[8px] md:text-[10px] text-blue-600 dark:text-blue-400 italic'>{moment(comment?.created_at).fromNow()}</span>
            </div>
        </motion.div>
    )
}

export default Comment