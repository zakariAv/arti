import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadWebsite = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center z-50"
        >
            <div className="w-12 h-12  rounded-full flex flex-col justify-center gap-4 items-center">
                <motion.div initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <AiOutlineLoading3Quarters className='text-[70px]' />
                </motion.div>
                <div className='text-center'>Loading..</div>
            </div>
        </motion.div>
    );
};

export default LoadWebsite;