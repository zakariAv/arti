import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
const DescriptionSection = () => {

    return (
        <section className="min-h-[300px] lg:min-h-[400px] flex-center bg-[url('../../../assets/blob-desc.svg')] bg-no-repeat bg-cover border-2 border-b-0 border-stone-300">
            <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} className="w-full sm:w-2/3 px-2 md:px-0 lg:w-1/2 sm:mx-auto py-6 md:py-16 space-y-5 ">
                <p className="text-2xl my-auto md:text-3xl lg:text-5xl font-semibold text-center uppercase"> Engage with our community by reading, commenting, and sharing your thoughts on our featured articles.</p>
                <p className='  text-2xl font-medium text-center'>What are you waiting? </p>
                <p className='text-center font-semibold italic'><Link to='/register' className='underline text-lg  transition-all'>Join Now</Link></p>
            </motion.div>
        </section>
    )
}

export default DescriptionSection