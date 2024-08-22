import { memo } from 'react'
import Modal from '../UI/Modal'
import ProfilePicture from '../user/ProfilePicture'
import { BiLike } from 'react-icons/bi'

const LikesModal = ({ closeModal, likes }) => {

    if (!likes.length) return;

    return (
        <Modal title="Likes" closeModal={closeModal}>
            <div className='space-y-2'>
                {likes.map(like => {
                    if (!like.active) return;
                    return <div key={like._id} className='flex justify-between items-center border p-1'>
                        <div className='flex items-center gap-1 '>
                            <div className='w-7 h-7 '>
                                <ProfilePicture image={like.profile} className='h-full w-full rounded-full object-cover shadow-smooth' />
                            </div>
                            <h1 className='text-sm font-semibold'>{like.firstName} {like.lastName}</h1>
                        </div>
                        <BiLike className='text-blue-500 scale-125' />
                    </div>
                })}
            </div>
        </Modal>
    )
}

export default memo(LikesModal)