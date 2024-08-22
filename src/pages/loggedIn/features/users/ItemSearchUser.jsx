import { memo } from 'react'
import ProfilePicture from '../../../../components/user/ProfilePicture'
import getRole from '../../../../utils/getRole'
import { Link } from 'react-router-dom'
import useAuth from '../../../../hooks/useAuth'

const ItemSearchUser = ({ user }) => {
    const { auth } = useAuth();
    console.log('reder item')
    return (
        <Link to={user._id === auth.userId ? '/main/profile' : `/main/member/${user._id}`}>
            <div className='w-full hover:bg-slate-100 dark:hover:bg-gray-600 flex items-center gap-2 p-1  md:p-2 border-b transition-colors'>
                <ProfilePicture image={user.profile} className='w-7 h-7 md:w-10 md:h-10 rounded-full' />
                <div className='grid grid-cols-1'>
                    <h1 className='font-semibold text-[10px] sm:text-xs md:text-sm'>{user.firstName} {user.lastName}</h1>
                    <span className='text-[8px] sm:text-[10px] md:text-xs '>{getRole(user.role)}</span>
                </div>
            </div>
        </Link>
    )
}

export default memo(ItemSearchUser)