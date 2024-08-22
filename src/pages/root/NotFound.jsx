import { CgDanger } from "react-icons/cg";

const NotFound = () => {
    return (
        <div className='w-screen h-screen bg-silver grid place-content-center'>

            <div className='font-bold uppercase text-lg md:text-3xl text-blue-800 flex gap-x-4'>

                <CgDanger />
                <p>404 - Not found!</p>
                <CgDanger />


            </div>


        </div>
    )
}

export default NotFound