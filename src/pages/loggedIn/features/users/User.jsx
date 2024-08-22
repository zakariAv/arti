
import getAuthUserId from '../../../../utils/getAuthUserId'
import getRole from '../../../../utils/getRole'
import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {

    const isActive = user.active
    const userId = getAuthUserId()

    const navigate = useNavigate()
    return (

        <tr onClick={() => userId !== user._id ? navigate(`/main/member/${user._id}`) : navigate('/main/profile')} className='border-b text-xs sm:text-sm hover:cursor-pointer  hover:bg-slate-100 dark:hover:bg-blue-800 transition-colors border'>
            <td className='border-e md:py-2 flex-center flex-nowrap gap-1 capitalize '>
                <span>{user.firstName}</span>
                <span>{user.lastName}</span>
            </td>
            <td className='border-e md:py-2'>{user.username}</td>
            <td className='border-e hidden md:block md:py-2'>{user.email}</td>
            <td className='border-e md:py-1'>{getRole(user.role)}</td>
            <td className={`${isActive ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'} border font-semibold hidden sm:block md:py-2`}>{isActive ? 'Yes' : 'No'}</td>
        </tr>
    )
}

export default User