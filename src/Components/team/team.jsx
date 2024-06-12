import React from 'react';
import Navbar from "../navbar/navbar.jsx";
import {style} from "../../utils/style.js";

function Team(props) {
    return (
        <div>
            <Navbar/>
            <hr/>
            <div className={`${style.container}`}>
                <p className='text-4xl font-bold text-center text-primary'>
                    Team
                </p>

            </div>

        </div>
    );
}

export default Team;