
import { FaPlus } from 'react-icons/fa'
import { IoCloseCircle } from "react-icons/io5";

const AddImageArticle = ({ file, setFile }) => {



    return (
        <div className='shadow-smooth'>

            <label htmlFor="image" className='inline-block cursor-pointer w-full aspect-video max-h-72 overflow-hidden'>
                <div className='relative w-full h-full group hover:bg-slate-300 dark:bg-transparent transition-all bg-slate-200 flex-center border-2'>
                    {file ?
                        <div className=''>
                            <button className='absolute top-0 right-0' onClick={() => setFile('')}>
                                <IoCloseCircle className='text-lg sm:text-2xl md:text-3xl m-0.5 md:m-2 hover:scale-125 transition-all dark:text-black hover:text-red-600' />
                            </button>
                            <img src={URL.createObjectURL(file)} className='w-full h-full' />
                        </div>
                        :
                        <FaPlus className='text-2xl md:text-5xl text-slate-600 dark:text-light group-hover:scale-150 duration-200' />
                    }
                </div>
            </label>
            <input type="file" id='image' name='image' accept="image/png, image/gif, image/jpeg" className='hidden' onChange={e => setFile(e.target.files[0])} />
        </div>
    )
}

export default AddImageArticle