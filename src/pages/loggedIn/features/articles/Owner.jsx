import { memo } from 'react'
import ProfilePicture from '../../../../components/user/ProfilePicture'
import { Link } from 'react-router-dom'
import getAuthUserId from '../../../../utils/getAuthUserId'

const Owner = ({ user }) => {

    const userId = getAuthUserId()

    return (
        <div className='flex items-center gap-1 justify-end py-1'>
            <span className='text-[10px] sm:text-sm text-blue-400 font-semibold'>by:</span>
            <Link to={userId === user._id ? '/main/profile' : `/main/member/${user._id}`} className='hover:text-blue-700 hover:underline transition-all'>
                <div className='flex items-center gap-1 bg-slate-200 border dark:bg-transparent py-0.5 px-1 rounded-md'>
                    <ProfilePicture image={user.profile} className='w-3 h-3 sm:w-4 sm:h-4 rounded-full' />
                    <div className='flex gap-0.5 text-[10px] sm:text-sm font-bold'>
                        <span>{user.firstName}</span>
                        <span>{user.lastName}</span>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default memo(Owner)