import { memo } from 'react'
import Modal from '../UI/Modal';
import { BiDislike } from 'react-icons/bi';
import ProfilePicture from '../user/ProfilePicture';

const DislikesModal = ({ closeModal, dislikes }) => {
    if (!dislikes.length) return;
    return (
        <Modal title='Dislikes' closeModal={closeModal}>
            <div className='space-y-2'>
                {dislikes.map(dislike => {
                    if (!dislike.active) return;
                    return <div key={dislike._id} className='flex justify-between items-center border p-1'>
                        <div className='flex items-center gap-1 '>
                            <div className='w-7 h-7 '>
                                <ProfilePicture image={dislike.profile} className='h-full w-full rounded-full object-cover shadow-smooth' />
                            </div>
                            <h1 className='text-sm font-semibold'>{dislike.firstName} {dislike.lastName}</h1>
                        </div>
                        <BiDislike className='text-blue-500 scale-125' />
                    </div>
                })}
            </div>
        </Modal>
    )
}

export default memo(DislikesModal)