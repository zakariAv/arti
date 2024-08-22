import { motion } from 'framer-motion'

const ReportsSection = () => {
    return (
        <section className='min-h-96 p-5 '>
            <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className='h-full z-10  bg-blue-500 rounded-3xl  p-2 text-white'>
                <div className=" py-12 space-y-6 w-full sm:w-10/12  md:w-8/12 mx-auto ">
                    <p className="text-3xl md:text-4xl lg:text-5xl text-center">
                        You can report any artcile if you find it against our community standard!
                    </p>
                    <p className="font-bold text-2xl md:text-3xl lg:text-4xl text-center bg-white text-black italic p-3 rounded-3xl">
                        Admins and Editors will recieve your reports and take the appropriate action
                    </p>
                </div>
            </motion.div>
        </section>
    )
}

export default ReportsSection