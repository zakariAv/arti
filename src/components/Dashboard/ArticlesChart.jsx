import React from 'react'
import { Pie } from 'react-chartjs-2'
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

const ArticlesChart = ({ isLoading, publicArticles, privateArticles }) => {
    const data = {
        labels: ['Public Articles', 'Private Articles'],
        datasets: [{
            data: [publicArticles, privateArticles],
            backgroundColor: ['#3b82f6', '#172554']
        }],
        hoverOffset: 4
    }

    if (isLoading) return <div className='h-full flex-center bg-gray-300 animate-pulse'>
    </div>

    return (
        <div className='flex-center p-0 md:p-2 border-2  border-slate-500 rounded-2xl'>
            <Pie data={data} className='pb-2' />
        </div>
    )
}

export default ArticlesChart