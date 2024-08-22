import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='bg-white border-t border-stone-300 shadow-smooth z-40'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-10/12 mx-auto px-3 py-5 md:py-9'>
                <div className='flex-center text-4xl'>
                    <Logo className='text-3xl lg:text-5xl' />
                </div>
                <div className='grid grid-cols-2 place-items-center font-medium min-w-[230px]'>
                    <Link to='/' className='hover:text-blue-500 transition-colors'>Home</Link>
                    <Link to='/login' className='hover:text-blue-500 transition-colors'>Login</Link>
                    <Link to='/register' className='hover:text-blue-500 transition-colors'>Register</Link>
                    <Link to='/public-articles' className='hover:text-blue-500 transition-colors'>Public articles</Link>
                </div>
                <div className='flex-center flex-col text-sm italic'>
                    <p>example@example.com</p>
                    <p>+49 999 999 99900</p>
                </div>
            </div>
            <div className='text-center font-semibold py-2 mt-5 text-sm sm:text-sm bg-blue-500 text-white'>&copy;Copyrights</div>
        </footer>
    )
}

export default Footer