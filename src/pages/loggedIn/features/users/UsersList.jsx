import { memo } from 'react'
import User from "./User"


const UsersList = ({ filteredResult }) => {
  
    return (
        !filteredResult?.length ?
            <div className="h-full w-full flex-center">
                <p>No users found</p>
            </div> :
            <table className="table-auto w-[98%] mx-auto text-center my-1 sm:my-2">
                <thead>
                    <tr className="text-xs sm:text-sm md:text-base border text-blue-500">
                        <th className="border-e">Name</th>
                        <th className="border-e ">Username</th>
                        <th className="border-e hidden md:block">Email</th>
                        <th className="border-e">Role</th>
                        <th className="border-e hidden sm:block">Active</th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        filteredResult.map(user => <User key={user._id} user={user} />)
                    }
                </tbody>
            </table>
    )
}

export default memo(UsersList)



