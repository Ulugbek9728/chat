import {style} from "../../utils/style.js";
import "./footer.scss"


function Footer() {
    return (
        <div className='footer bg-sky-800'>
            <div className={`${style.container} ${style.padding} mb-0 text-center text-white`}>
                All Rights Reserved By
            </div>
        </div>

    );
}

export default Footer;