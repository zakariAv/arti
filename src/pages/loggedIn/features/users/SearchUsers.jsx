
import { useCallback, useState, memo } from "react";
import { useDebounce } from '../../../../hooks/useDebounce'
import { motion } from 'framer-motion'
import { IoMdSearch } from "react-icons/io";
import ItemSearchUser from "./ItemSearchUser";

const SearchUsers = ({ users }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce({ value: searchQuery });

    const handleSubmit = useCallback((e) => e.preventDefault(), []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const searchResult = users.filter((user) => {
        if (!debouncedSearchQuery) return;
        const searchValue = debouncedSearchQuery.toLowerCase();
        return (
            user.username.toLowerCase().includes(searchValue) ||
            user.firstName.toLowerCase().includes(searchValue) ||
            user.lastName.toLowerCase().includes(searchValue) ||
            user.firstName.toLowerCase().concat(' ').concat(user.lastName.toLowerCase()).includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue)
        );
    });

    return (
        <div className='relative'>
            <form className='flex items-center border border-slate-400 w-[120px] sm:w-fit rounded-lg' onSubmit={handleSubmit} >
                <input type="text" id='search' onChange={handleSearchChange} placeholder="Search for user" autoComplete="off"
                    className="bg-transparent border-none focus:outline-0  p-1 lg:p-2 text-[10px] sm:text-sm placeholder:text-[10px] sm:placeholder:text-sm " />
                <IoMdSearch className="text-xl text-slate-400" />
            </form>
            {
                debouncedSearchQuery && <motion.div initial={{ opacity: 0, y: 70 }} whileInView={{ y: 0 }} animate={{ opacity: 1 }}
                    className=" bg-white border dark:bg-gray-900 absolute md:top-12 left-0 rounded-sm shadow-smooth overflow-y-scroll h-80 w-[150px] sm:w-[400px]">
                    {!searchResult.length ? <div className="w-full h-full flex-center">
                        <p className="italic py-2 text-[10px] sm:text-xs md:text-sm">No results found</p>
                    </div> :
                        <div className="h-full flex flex-col justify-between" >
                            <div>
                                {searchResult.map(user => <ItemSearchUser key={user._id} user={user} />)}
                            </div>
                            <p className="text-center p-1 font-bold text-[8px] sm:text-[10px] md:text-xs  border-b border-slate-400 text-slate-500 ">{searchResult.length} Results found</p>

                        </div>
                    }
                </motion.div>
            }
        </div>
    )
}

export default memo(SearchUsers);