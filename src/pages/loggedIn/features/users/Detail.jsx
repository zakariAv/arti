import { memo } from 'react'
import { motion } from 'framer-motion'

const Detail = ({ label, data }) => {
    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='flex flex-col items-center gap-1 border flex-1 p-1 rounded-md bg-white dark:bg-transparent'>
            <span className='font-semibold text-blue-700 dark:text-blue-500 italic underline text-xs sm:text-base md:text-lg'>{label}</span>
            <span className='text-center text-[10px] sm:text-xs md:text-sm'>{data}</span>
        </motion.div>
    )
}

export default memo(Detail)