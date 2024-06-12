import React from 'react';
import Navbar from "./navbar/navbar.jsx";

function PageNotFound(props) {
    return (
        <div>
            <Navbar/>
            <hr/>
            <img style={{width:'30%', marginTop:'2%'}} className='mx-auto' src="./img/404-error.svg" alt=""/>
        </div>
    );
}

export default PageNotFound;