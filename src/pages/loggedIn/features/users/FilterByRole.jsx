import { memo } from 'react'
import ROLE_TYPES from "../../../../utils/ROLE_TYPES";



const FilterByRole = ({ users, setFilterResult }) => {



    const handleFilterChange = (e) => {
        if (!e.target.value) return;
        if (parseInt(e.target.value) === 100) return setFilterResult(users);
        const resultArray = users.filter(
            (user) => user.role === parseInt(e.target.value),
        );
        setFilterResult(resultArray);
    };

    return (
        <select
            name="role"
            id="role"
            aria-label="Filter by Role"
            defaultValue="100"
            onChange={handleFilterChange}
            className=" rounded-lg border min-w-[70px] sm:w-fit border-slate-400 p-0.5 md:p-1 lg:p-2 text-[10px] sm:text-sm placeholder:text-[10px] sm:placeholder:text-sm bg-transparent text-slate-400 focus:outline-none"
        >
            <option value="100" className="text-gray-500 dark:text-white dark:bg-gray-800">All</option>
            {Object.keys(ROLE_TYPES).map((role) => (
                <option key={role} value={ROLE_TYPES[role]} className=" text-black text-lg dark:text-white dark:bg-gray-800  
                    uppercase">
                    {role}S
                </option>
            ))}
        </select>

    );
};

export default memo(FilterByRole);
