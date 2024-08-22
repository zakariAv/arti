import { BiDislike } from 'react-icons/bi'
import { BiSolidDislike } from "react-icons/bi";
import { memo } from 'react'
import getAuthUserId from '../../../../utils/getAuthUserId'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'


const AddDisLike = ({ articleId, dislikeExisted }) => {
    
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    const userId = getAuthUserId()


    const { mutate, isPending } = useMutation({
        mutationKey: ['addLike', userId, articleId],
        mutationFn: () => {
            return axiosPrivate.post('/blogs/manage-dislike', {
                blogId: articleId
            })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['article', articleId])
        },

    })
    return (
        <button disabled={isPending} onClick={mutate} title='dislike this article' className={`${dislikeExisted ? 'border-blue-500 text-blue-500' : 'border-slate-400'} hover:text-blue-500 flex items-center gap-1
         border-2 transition-colors hover:border-blue-500  px-1 py-0.5 text-[10px] sm:text-sm`}>
            {dislikeExisted ? <BiSolidDislike className='text-xs sm:text-lg' /> : <BiDislike className='text-xs sm:text-lg' />}
            <span>Dislike</span>
        </button>
    )
}

export default memo(AddDisLike)