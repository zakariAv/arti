import { memo } from 'react'

const SearchCategoryItem = ({ category }) => {
    console.log('render')
    return (
        <div className='flex items-center justify-between p-1 sm:p-2 border-b text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-blue-500'>
            <span className='capitalize font-semibold'>{category.name}</span>
            <span className='text-blue-500'>{category.num_articles}</span>
        </div>
    )
}

export default memo(SearchCategoryItem)