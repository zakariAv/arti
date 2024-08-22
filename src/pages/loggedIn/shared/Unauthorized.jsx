import { CgDanger } from "react-icons/cg";

const Unauthorized = () => {
    return <div className="flex-center text-3xl font-bold h-screen">
        <p className="flex gap-2 underline"><CgDanger />Unauthorized!<CgDanger /></p>
    </div>;
};

export default Unauthorized;
