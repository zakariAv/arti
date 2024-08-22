import React from 'react'
import { motion } from 'framer-motion'
const Hero = () => {

  const greeting = "Welcome To Arti Website".split(" ")

  return (
    <section className='relative h-[300px] md:h-[500px] py-8 lg:py-10 bg-white  border-2 border-t-0 border-b-0 border-stone-300'>
      <img src="./assets/earth.webp" className='w-[250px] h-[250px]  md:w-[400px] md:h-[400px] mx-auto z-10' alt="" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className='w-11/12 lg:w-8/12 absolute top-1/2 left-1/2 transform -translate-y-1/2 
      -translate-x-1/2 z-20  font-bold text-center bg-black/70 p-2 md:p-3
       rounded-2xl shadow-smooth text-white space-y-3'>
        <p className='text-2xl sm:text-3xl md:text-4xl uppercase'>
          {greeting.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 5
              }}
              key={i}
            >
              {el}{" "}
            </motion.span>
          ))}
        </p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className='sm:text-base md:text-lg lg:text-xl italic '>Feel free to read and find articles about anything you want</motion.p>
      </motion.div>

    </section>
  )
}

export default Hero