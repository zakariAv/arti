
import { BiLike } from 'react-icons/bi'
import { BiSolidLike } from "react-icons/bi";
import { memo } from 'react'
import getAuthUserId from '../../../../utils/getAuthUserId'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'


const AddLike = ({ articleId, likeExisted }) => {

    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()

    const userId = getAuthUserId()



    const { mutate, isPending } = useMutation({
        mutationKey: ['addLike', userId, articleId],
        mutationFn: () => {
            return axiosPrivate.post('/blogs/manage-like', {
                blogId: articleId
            })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['article', articleId])
        }

    })

    return (
        <button disabled={isPending} onClick={mutate} title='like this article' className={`${likeExisted ? 'border-blue-500 text-blue-500' : 'border-slate-400'} hover:text-blue-500 flex items-center gap-1
         border-2 transition-colors hover:border-blue-500  px-1 py-0.5 text-[10px] sm:text-sm`}>
            {likeExisted ? <BiSolidLike className='text-xs sm:text-lg' /> : <BiLike className='text-xs sm:text-lg' />}
            <span>Like</span>
        </button>
    )
}

export default memo(AddLike)