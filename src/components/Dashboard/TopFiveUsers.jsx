import React, { useCallback } from 'react'
import TopUser from './TopUser'

const TopFiveUsers = ({ isLoading, topUsers }) => {



    if (isLoading) <div className="w-full animate-pulse">
        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
    </div>

    return (
        <div className="md:col-span-2 lg:col-span-1 rounded-2xl border-2 border-slate-500 p-1 sm:p-2">
            <h1 className="border-b-2 border-slate-500 pb-0.5  text-center text-lg font-semibold sm:text-2xl">
                Top 5 members
            </h1>
            <div className="space-y-3 pt-3">
                {isLoading ? (
                    <div className="w-full animate-pulse">
                        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
                        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
                        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
                        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
                        <h3 className="mb-4 h-14 rounded-full bg-gray-300"></h3>
                    </div>
                ) : (
                    topUsers.map((user) => (
                        <TopUser key={user.user._id} user={user.user} />
                    ))
                )}
            </div>
        </div>
    )
}

export default TopFiveUsers