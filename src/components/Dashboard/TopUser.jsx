import { memo } from 'react'
import { RiVipCrownFill } from 'react-icons/ri'
import ProfilePicture from '../user/ProfilePicture'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'
import getRole from '../../utils/getRole'

const TopUser = ({ user }) => {
    return (
        <div key={user._id} className='relative flex justify-between items-center border-2 border-violet-700 p-1 sm:p-2 rounded-3xl shadow-md hover:scale-95 transition-all'>
            <div className='flex items-center gap-2'>
                <RiVipCrownFill className='absolute -top-2 left-0 text-lg sm:text-xl text-yellow-500 dark:text-yellow-400 ' />
                <span className='text-[10px] absolute -top-1 z-10 bg-violet-700 text-white rounded-3xl p-0.5 right-0'>{getRole(user.role)}</span>
                <ProfilePicture image={user.profile} className='w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover' />
                <Link to={`/main/member/${user._id}`} className='text-xs sm:text-base capitalize font-medium'>{user.firstName} {user.lastName}</Link>
            </div>
            <span className='italic px-0 sm:px-2 flex items-center gap-1 text-xs sm:text-base'>
                <CountUp start={0} end={user.articleCount} />
                <span className='text-xs'>Articles</span>
            </span>
        </div>
    )
}

export default memo(TopUser)