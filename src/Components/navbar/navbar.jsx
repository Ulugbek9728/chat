import {style} from "@/utils/style.js";
import {NavLink} from "react-router-dom";
import LanguageSwitcher from "../../LanguageSwitcher/index.jsx";


function Navbar() {
    return (
        <div className={`${style.padding}  bg-bluee mt-0 mb-0`}>
            <div className={`${style.container} flex flex-wrap justify-between items-center mx-auto px-5`}>
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./logo.png" className="h-14" alt="Flowbite Logo"/>
                    <span className={`${style.font} self-center font-semibold whitespace-nowrap text-white`}>Logo name</span>
                </NavLink>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <LanguageSwitcher/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;