
import {style} from "../../utils/style.js";
import {NavLink} from "react-router-dom";


function Navbar() {
    return (

        <div className={`${style.container, style.padding} border border-b-cyan-50 border-t-0 border-l-0 border-r-0 mt-0 border-gray-200 dark:bg-gray-900`}>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./logo.png" className="h-14" alt="Flowbite Logo"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo name</span>
                </NavLink>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <a href="tel:5541251234" className="text-sm  text-gray-500 dark:text-white hover:underline">(555)
                        412-1234</a>
                    <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;