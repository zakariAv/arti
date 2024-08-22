import { motion } from 'framer-motion'

const ErrorMsgModal = ({ errMsg }) => {
  return (
    <motion.p initial={{ y: -10 }} animate={{ y: 0 }} className="text-center text-[8px] sm:text-xs md:text-sm lg:text-base mx-1 py-1 mb:1 rounded-md bg-red-500 text-white">
      {errMsg}
    </motion.p>

  )
}

export default ErrorMsgModal