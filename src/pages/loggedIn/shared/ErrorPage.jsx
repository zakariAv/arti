import React from 'react'

const ErrorPage = ({ message }) => {
    return (
        <section className='w-full h-full bg-silver dark:bg-blue-800 flex justify-center items-start'>
            <p className='my-6 shadow-smooth bg-white rounded-3xl font-bold text-base md:text-2xl italic dark:text-black dark:bg-blue-100 px-4 py-7'>{message}</p>
        </section>
    )
}

export default ErrorPage