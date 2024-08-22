import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'


const SaveArticle = ({ isSaved, articleId }) => {

    const queryClient = useQueryClient()



    const axiosPrivate = useAxiosPrivate()

    const { mutate, isPending } = useMutation({
        mutationKey: ['save-article'],
        mutationFn: (articleId) => {
            return axiosPrivate.post('/savedBlogs', {
                blogId: articleId
            })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('articles')
        }
    })

    return (
        <button disabled={isSaved || isPending}
            title='Save article'
            className='bg-blue-500 text-sm sm:text-base hover:bg-blue-800 transition-colors text-white flex items-center gap-1 py-0 px-0.5 sm:px-1 sm:py-0.5 rounded-md'
            onClick={() => mutate(articleId)}
        >
            <FaArrowDown />
            <span className='text-sm sm:text-base font-medium'>
                Save
            </span>
        </button>
    )
}

export default memo(SaveArticle)