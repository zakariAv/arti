import { motion, AnimatePresence } from "framer-motion";
const ErrorMsg = ({ errMsg }) => {
  return (
    <AnimatePresence>
     { errMsg && <motion.div
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        exit={{ y: -200, opacity: 0 }}
        className="absolute -top-12 left-0 w-full rounded-lg bg-red-500 p-2 text-center text-sm text-white"
      >
        <p className="first-letter:capitalize">{errMsg}</p>
      </motion.div>
}
    </AnimatePresence>
  );
};

export default ErrorMsg;
