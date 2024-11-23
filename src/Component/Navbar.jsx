import { BiReset } from "react-icons/bi";
import { FaList } from "react-icons/fa";
const Navbar = () => {
    return (
        <>
            <div 
            className="flex items-center justify-between w-full px-6 pt-8 bg-transparent md:pt-10 md:pb-3 md:px-24">
                <BiReset className="md:text-[33px] text-[30px]" />
                <FaList className="md:text-[33px] text-[30px]" />
            </div>
        </>
    )
}

export default Navbar