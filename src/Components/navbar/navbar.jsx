import {style} from "../../utils/style.js";
import {NavLink} from "react-router-dom";
import LanguageSwitcher from "../../LanguageSwitcher/index.jsx";


function Navbar() {
    return (

        <div className={`${style.container, style.padding} border border-b-cyan-50 border-t-0 border-l-0 border-r-0 mt-0 dark:bg-blue-2000`}>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./logo.png" className="h-14" alt="Flowbite Logo"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap text-white">Logo name</span>
                </NavLink>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <LanguageSwitcher/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;