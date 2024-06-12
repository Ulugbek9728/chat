import React from 'react';
import Navbar from "../navbar/navbar.jsx";
import {style} from "../../utils/style.js";

function Project(props) {
    return (
        <div>
            <Navbar/>
            <hr/>
            <div className={`${style.container}`}>
                <p className='text-4xl font-bold text-center text-primary'>
                    Projects
                </p>
                

            </div>

        </div>
    );
}

export default Project;