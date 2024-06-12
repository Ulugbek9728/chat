import React from 'react';
import {style} from "../../utils/style.js";
import "./maxsulotlarimiz.scss"

function Maxsulotlarimiz(props) {
    return (
        <div className={`${style.padding} maxsulotlarimiz`}>
            <div className={`${style.container}`}>
                <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center text-primary'>Maxsulotlarimiz</h1>
                <div className="grid grid-cols-3 gap-4 md:gap-8 xl:gap-11 mt-4 md:mt-8">
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/1.jpg" alt=""/></div>
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/2.jpg" alt=""/></div>
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/3.jpg" alt=""/></div>
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/4.jpg" alt=""/></div>
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/5.jpg" alt=""/></div>
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/6.jpg" alt=""/></div>
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/7.jpg" alt=""/></div>
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/8.png" alt=""/></div>
                    <div><img className='w-full hover:drop-shadow-2xl rounded-xl cursor-pointer	' src="./img/9.jpg" alt=""/></div>
                </div>
            </div>

        </div>
    );
}

export default Maxsulotlarimiz;