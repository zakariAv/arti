import { memo } from 'react'
import { TbMessageReport } from "react-icons/tb";

const ReportArticle = ({ showReportModal }) => {
    return (
        <button
            onClick={showReportModal}
            title='Report article'
            className='bg-red-600 text-xs sm:text-sm hover:bg-red-800 transition-colors text-white flex items-center gap-1 py-0 px-0.5 sm:px-1 sm:py-0.5 rounded-md'

        >
            <TbMessageReport />
            <span>
                Report
            </span>
        </button>
    )
}

export default ReportArticle