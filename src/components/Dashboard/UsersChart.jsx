import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const UsersChart = ({ admins, editors, users, isLoading }) => {

    const data = {
        poll: 'poll',
        labels: ['Admins', 'Editors', 'Users'],
        datasets: [{
            data: [admins, editors, users],
            backgroundColor: ['#1e3a81', '#0ea5e9', '#4f46e5']
        }],
        hoverOffset: 4
    }

    if (isLoading) return <div className='h-full flex-center bg-gray-300 animate-pulse'>
    </div>


    return (
        <div className='flex-center border-2 border-slate-500  rounded-2xl p-0 md:p-2'>
            <Doughnut data={data} className='pb-2' />
        </div>
    )
}

export default UsersChart