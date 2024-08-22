import { memo } from 'react'
import Category from './Category'


const CategoriesList = ({ categories }) => {

    return (
        !categories?.length ? <div className='h-full w-full flex-center'>
            <div className=' h-96 flex-center'>
                <p className='text-lg sm:text-xl font-semibold'>No Categories found</p>
            </div>
        </div> :
            <div className='my-2 text-xs sm:text-sm md:text-base w-full sm:w-11/12 mx-auto '>
                <div className='grid grid-cols-3 sm:grid-cols-4 font-semibold text-center border text-[10px] sm:text-sm md:text-base  text-blue-500 '>
                    <h4 className='border-e py-1'>Category Name</h4>
                    <h4 className='border-e hidden sm:block  py-1'>Created at</h4>
                    <h4 className='border-e py-1'>Articles related</h4>
                    <h4 className='py-1'>Operations</h4>
                </div>
                <div className='flex flex-col '>
                    {categories.map(category => <Category key={category._id} category={category} />)}
                </div>

            </div>
    )
}

export default memo(CategoriesList)



{/* <div className='p-2'>

</div> */}