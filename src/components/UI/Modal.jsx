import { TfiClose } from "react-icons/tfi";


const Modal = ({ children, title, closeModal }) => {
    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-transparent z-50 backdrop-blur flex justify-center items-start md:items-center '>
            <div
                id='modal'

                className='bg-white shadow-smooth border-2 dark:bg-gradientDark  w-full sm:w-2/3 sm:mx-auto max-w-[560px] overflow-y-scroll rounded-md max-h-[calc(100vh-100px)]'>
                <div className='flex justify-between items-center sticky bg-silver dark:bg-gray-800 shadow-smooth top-0 left-0 p-4 text-lg sm:text-xl md:text-2xl pb-3'>
                    <h2 className="font-medium">{title}</h2>
                    <button onClick={closeModal}>
                        <TfiClose className="hover:rotate-180 hover:text-red-500 transition-all duration-300 " />
                    </button>
                </div>

                <div className="p-2 md:p-4">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Modal