import {style} from "../../utils/style.js";
import "./footer.scss"


function Footer() {
    return (
        <div className='footer bg-bluee absolute bottom-0 w-full'>
            <div className={`${style.container} ${style.padding} mb-0 text-center text-white mt-0`}>
                All Rights Reserved By
            </div>
        </div>

    );
}

export default Footer;