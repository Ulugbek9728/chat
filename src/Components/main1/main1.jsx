import React from 'react';
import "./main1.scss"
import {style} from "../../utils/style.js";


function Main1(props) {
    return (

        <div className='main'>
            <div className={`${style.container}`}>
                <div className="flex grid-cols-2 gap-5 xl:gap-16">
                    <div className='px-3 py-10 lg:py-20 md:px-0'>
                        <div className="text-white text-2xl md:text-4xl lg:text-6xl font-bold" style={{lineHeight:"130%"}}>
                            Xitoy elektr tovarlarini ulgurji narxlarda xarid qiling
                        </div>

                        <div className="md:grid grid-cols-3 mt-5 md:mt-10 text-sm xl:text-2xl font-bold text-white">
                            <div className='flex md:block mt-3 md:mt-0'>
                                <img className='w-1/12 md:w-10' src="./img/kafolat.svg" alt=""/>
                                <div className="mt-0 ml-3 md:mt-3 md:ml-0">1 yil kafolat</div>
                            </div>
                            <div className='flex md:block mt-3 md:mt-0'>
                                <img className='w-1/12 md:w-10' src="./img/konsultant.svg" alt=""/>
                                <div className=" mt-0 ml-3 md:mt-3 md:ml-0">Foydalanishda bepul konsultatsiya</div>
                            </div>
                            <div className='flex md:block mt-3 md:mt-0'>
                                <img className='w-1/12 md:w-10' src="./img/eltuv.svg" alt=""/>
                                <div className=" mt-0 ml-3 md:mt-3 md:ml-0">1 kunda tezkor yetkazib berish</div>
                            </div>
                        </div>

                    </div>
                    <img src="./img/shit.png" className='hidden md:block md:w-5/12 pt-10 lg:pt-14 md:pb-14' alt=""/>
                </div>

            </div>

        </div>
    );
}

export default Main1;