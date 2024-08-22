import React from 'react'
import useGetData from '../../hooks/useGetData'
import ErrorPage from '../../pages/loggedIn/shared/ErrorPage'
import Report from './Report'
import { ToastContainer } from 'react-toastify'

const ReportsList = () => {

    const { isLoading, data: reports, isError, error } = useGetData({ key: ['reports'], url: '/reports' })

    if (isLoading) return <div className='min-h-96 bg-slate-300 w-full m-2 animate-pulse'>
    </div>

    if (isError) return <ErrorPage message={error.reponse.data.message || error.message} />



    const getReportsNumberFromActiveUser = () => {
        return reports.filter(report => report.user.active).length
    }

    return (
        <>
            <ToastContainer />
            <div className='border-t-2 border-slate-300 p-1 sm:p-2 md:p-3 '>
                <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-center py-0.5 md:py-1 lg:py-2 underline underline-offset-2 font-semibold'>Articles Reports From Users ({getReportsNumberFromActiveUser()})</h2>
                {!reports.length ? <div className='min-h-96 text-xl  md:text-2xl  lg:text-3xl font-medium flex-center'>
                    There is no reports Yet!
                </div> :
                    <div className='max-h-[520px] py-2 overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2'>
                        {reports.map(report => <Report key={report._id} report={report} />)}
                    </div>
                }


            </div>
        </>

    )
}

export default ReportsList