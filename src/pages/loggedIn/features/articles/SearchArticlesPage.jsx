import { useCallback, useEffect, useRef, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { useDebounce } from '../../../../hooks/useDebounce';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';
import SearchResults from './SearchResults';

const SearchArticlesPage = () => {

    const axiosPrivate = useAxiosPrivate()
    const searchRef = useRef(null)

    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(true);
    const debouncedSearchQuery = useDebounce({ value: query, delay: 1200 })

    useEffect(() => {
        searchRef.current.focus()
    }, [])

    const queryApi = useQuery({
        queryKey: ['articles', debouncedSearchQuery],
        queryFn: () => {
            return axiosPrivate.get(`/blogs/search?q=${debouncedSearchQuery}`)
        },
        select: (data) => {
            return data?.data
        }
    })

    const handleSubmit = useCallback(e => {
        e.preventDefault()
    }, [])

    return (
        <>
            <div className='my-1 md:my-3 px-1 py-1 md:py-2  mx-auto max-w-[350px]'>
                <form onSubmit={handleSubmit}>
                    <div
                        onClick={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`flex justify-between items-center border-2 ${isFocused ? 'border-blue-500' : 'border-slate-500'} rounded-lg overflow-hidden`}>
                        <input
                            type="text"
                            autoComplete='off'
                            id='search'
                            name='query'
                            ref={searchRef}
                            value={query}
                            onChange={e => setQuery(e.target.value.trim())}
                            placeholder='Search for articles'
                            className='p-1 text-xs sm:text-sm dark:bg-transparent md:text-base flex-grow focus:outline-none text-blue-500 caret-blue-600'
                        />
                        <button type='submit'><IoMdSearch className={`text-2xl md:text-3xl ${isFocused && 'text-blue-500'}`} /></button>
                    </div>
                </form>
            </div>
            {debouncedSearchQuery ?
                <SearchResults queryApi={queryApi} />
                :
                <div className='h-full  flex-center bg-silver dark:bg-transparent'>
                    <p className='text-sm md:text-base lg:text-lg p-2 bg-blue-500/20 shadow-smooth '>Enter anything to search for ! <IoMdSearch className='inline text-2xl animate-pulse' /></p>
                </div>
            }
        </>

    )
}

export default SearchArticlesPage