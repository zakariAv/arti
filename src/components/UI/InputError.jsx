import {motion} from 'framer-motion'

const InputError = ({children}) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: -3 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-xs font-medium text-red-500"
  >
    {children}
  </motion.div>
  )
}

export default InputError