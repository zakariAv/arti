
import { memo } from "react"
import CountUp from 'react-countup'

const TotalItemsBox = ({ num, isLoading, icon, text }) => {

    return <div className="dark:bg-blue-950 bg-white border-2 border-s-0 border-blue-500 relative before:absolute before:w-[10px] before:h-full before:bg-blue-500
     shadow-smooth  rounded-xl overflow-hidden  hover:scale-90 hover:shadow-xl transition-all ">
        <div className="ms-[10px] h-full text-sm md:text-lg lg:text-xl p-1 lg:p-3 flex justify-between md:flex-col">
            <div className="flex justify-between items-center">
                <h1 className=" font-medium">{text}</h1>
                <span className="hidden lg:block scale-125">
                    {icon}
                </span>
            </div>
            <p className="text-center py-3 font-semibold">{isLoading ? 'Counting ..' : <CountUp start={0} end={num} />}</p>
        </div>
    </div>


}

export default memo(TotalItemsBox)



