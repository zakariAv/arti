import React, { useEffect, useState } from 'react'
import SearchUsers from './SearchUsers'
import useGetData from '../../../../hooks/useGetData'
import Spinner from '../../../../components/UI/Spinner'
import UsersList from './UsersList'
import FilterByRole from './FilterByRole'
import ErrorPage from '../../shared/ErrorPage'
import Button from '../../../../components/UI/Button'
import AddMemberModal from '../../../../components/modals/AddMemberModal'
import { FaUserPlus } from "react-icons/fa6";
import { ToastContainer } from 'react-toastify'

const UsersPage = () => {

    const [filteredResult, setFilterResult] = useState([]);
    const [openAddMember, setOpenAddMember] = useState(false)
    const { data: users, isLoading, isError, error } = useGetData({ key: ['usersData'], url: '/users' })

    useEffect(() => {
        if (users) setFilterResult(users)
    }, [users])

    if (isLoading) return <Spinner />
    if (isError) return <ErrorPage message={error.response.data.message || error.message} />

    return (
        <>
            <ToastContainer />
            {openAddMember && <AddMemberModal closeModal={() => setOpenAddMember(!openAddMember)} />}
            <>
                <div className='w-full lg:sticky lg:top-0 lg:left-0 bg-silver dark:bg-gray-800 p-1 lg:p-2'>
                    <div className='flex justify-start gap-1'>
                        <SearchUsers users={users} />
                        <FilterByRole users={users} setFilterResult={setFilterResult} />
                        <div className='flex flex-grow justify-end items-center'>
                            <Button title='Add member' onClick={() => setOpenAddMember(!openAddMember)} className=' text-sm lg:text-base flex  items-center gap-1'>
                                <FaUserPlus />
                                <span className='hidden sm:inline-block text-sm lg:text-base'>
                                    Add Member
                                </span>
                            </Button>
                        </div>
                    </div>


                </div>
                <UsersList filteredResult={filteredResult} />
            </>
        </>
    )

}

export default UsersPage




{/* <div className='  flex flex-wrap items-center gap-0.5 shadow-smooth py-2 md:py-3 md:px-2 '>
    <div className='flex flex-wrap items-center gap-2 flex-1'>
        <SearchUsers users={users} />
        <FilterByRole users={users} setFilterResult={setFilterResult} />
    </div>


        <Button onClick={() => setOpenAddMember(!openAddMember)} className='lg:px-7 text-sm lg:text-base flex items-center gap-1'>
            <FaUserPlus className='hidden sm:inline-block' />
            <span>
                Add Member
            </span>
        </Button>

</div>
<UsersList filteredResult={filteredResult} />
</ > */}