import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useGetData from '../../../../hooks/useGetData'
import ErrorPage from '../../shared/ErrorPage'
import Spinner from '../../../../components/UI/Spinner'
import validateIdURL from '../../../../utils/validateIdURL'
import formatDate from '../../../../utils/formatDate'
import ProfilePicture from '../../../../components/user/ProfilePicture'
import getRole from '../../../../utils/getRole'
import Button from '../../../../components/UI/Button'
import Detail from './Detail'
import { FaUserEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from 'react'
import EditMemberModal from '../../../../components/modals/EditMemberModal'
import { ToastContainer } from 'react-toastify'
import useAuth from '../../../../hooks/useAuth'
import DeleteMemberModal from '../../../../components/modals/DeleteMemberModal'
import OwnArticles from '../articles/OwnArticles'




const SingleUserPage = () => {

    const { id } = useParams()

    const role = useAuth().auth.role

    const [showEditMem, setShowEditMem] = useState(false);
    const [showDeleteMem, setShowDeleteMem] = useState(false);


    if (!validateIdURL(id)) return <ErrorPage message='Invalid ID passed' />

    const { data: userData, isLoading, isError, error } = useGetData({ key: ['user', id], url: `/auth/user/${id}` })


    return (
        isLoading ? <Spinner /> :
            isError ? <ErrorPage message={error.message} /> :
                <>
                    <ToastContainer />
                    {showEditMem && <EditMemberModal userData={userData} closeModal={() => setShowEditMem(!showEditMem)} />}
                    {showDeleteMem && <DeleteMemberModal userData={userData} closeModal={() => setShowDeleteMem(!showDeleteMem)} />}
                    <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='relative md:m-3 p-2 bg-silver min-h-screen dark:bg-transparent rounded-lg'>
                        {role === 6000 || role === 5150 &&
                            <div className=' flex justify-between items-center'>
                                <button
                                    title='Edit member'
                                    onClick={() => setShowEditMem(!showEditMem)}
                                    className='border-2 border-slate-500 bg-white dark:bg-transparent hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white hover:border-white transition-all rounded-full p-2 text-center '
                                >
                                    <FaUserEdit className='text-xl sm:text-2xl md:text-3xl' />
                                </button>
                                <button
                                    title='Delete member'
                                    onClick={() => setShowDeleteMem(!showDeleteMem)}
                                    className='border-2 border-slate-500 bg-white dark:bg-transparent hover:bg-red-500 dark:hover:bg-red-500 hover:text-white hover:border-white transition-all rounded-full p-2 text-center '

                                >
                                    <FaTrash className='text-xl sm:text-2xl md:text-3xl' />

                                </button>
                            </div>
                        }
                        <div className='w-full mt-2 relative'>
                            <div className='h-32 w-32 md:w-40 md:h-40 rounded-full mx-auto relative'>
                                <ProfilePicture image={userData.profile} className='w-full h-full rounded-full  object-cover border-2 border-white' />
                                <span className={`${userData.active ? 'bg-green-500' : 'bg-red-500'} absolute top-2 right-3 md:right-6 w-6 h-6 rounded-full`}></span>

                            </div>
                        </div>
                        <div className='flex-center flex-col gap-2 py-5 '>
                            <h1 className='font-medium text-xl md:text-2xl lg:text-3xl capitalize'>{userData.firstName} {userData.lastName}</h1>
                            <span className='text-xs sm:text-sm font-medium capitalize'>{getRole(userData.role)}</span>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-center font-medium text-xl md:text-2xl lg:text-3xl capitalize text-slate-500'>{userData.firstName}'s Information</h1>
                            <div className='p-1 md:p-3 flex flex-wrap gap-1 '>
                                <Detail label='Email:' data={userData.email} />
                                <Detail label='Username:' data={userData.username} />
                                <Detail label='Role:' data={getRole(userData.role)} />
                                <Detail label='Joined at:' data={formatDate(userData.created_at)} />
                                {userData.job && <Detail label='Job:' data={userData.job} />}
                                {userData.mobile && <Detail label='Mobile:' data={userData.mobile} />}
                                {userData.gender && <Detail label='Gender:' data={userData.gender} />}
                                {userData.address && <Detail label='Location:' data={`${userData.address?.city}-${userData.address?.country}`} />}
                            </div>
                        </div>


                        {userData.role !== 2001 && <div className='border border-t-4'>
                            <h3 className='text-center font-medium text-xl py-2 md:text-2xl lg:text-3xl capitalize text-slate-500'>{userData.firstName}'s articles Related</h3>
                            <div className='p-0.5 sm:p-1 md:p-3 grid h-fit w-full max-w-[600px] grid-cols-1 gap-6 shadow-2xl sm:mx-auto sm:w-9/12'>
                                <OwnArticles id={id} />
                            </div>
                        </div>
                        }

                    </motion.section>
                </>

    )
}

export default SingleUserPage