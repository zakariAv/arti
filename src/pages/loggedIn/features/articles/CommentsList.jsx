import { memo } from 'react'
import Comment from './Comment';


const CommentsList = ({ comments, articleId }) => {


  const renderedComments = comments.map(comment => <Comment key={comment._id} comment={comment} articleId={articleId} />)

  return (
    <div id='comments' className='grid grid-cols-1 gap-y-1 my-2 h-fit max-h-60 overflow-y-scroll scrollbar-thin  scrollbar-thumb-[#90aaf8] scrollbar-track-[#f1f1f1]'>
      {comments.length ? renderedComments : <p className='text-center text-xs sm:text-sm italic font-semibold my-2'>No comments Yet</p>}
    </div>
  )
}

export default memo(CommentsList)