// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import "./main1.scss"
import {style} from "../../utils/style.js";
import { Radio, Select  } from 'antd';

function Main1() {

    return (

        <div className='main'>
            <div className={`${style.container}`}>
                <div className="grid grid-cols-3 gap-5 xl:gap-16 mt-40">
                    <div>
                        <p className='text-white text-6xl font-bold uppercase'>
                            find friend youre life
                        </p>
                        <div className=" w-full bg-white rounded-3xl drop-shadow-2xl mt-10 p-5">
                            <div className='flex py-7'>
                                <h1 className='text-2xl'>I am a:</h1>
                                <div className='ml-4 text-2xl'>
                                    <Radio.Group >
                                        <Radio value={1} className='text-lg uppercase'>Male</Radio>
                                        <Radio value={2} className='text-lg uppercase'>Female</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            {/*<hr/>*/}
                            <div className='flex py-7 border border-b-gray border-t-gray border-l-0 border-r-0'>
                                <h1 className='text-2xl'>Seeking a:</h1>
                                <div className='ml-4 text-2xl'>
                                    <Radio.Group>
                                        <Radio value={1} className='text-lg uppercase'>Man</Radio>
                                        <Radio value={2} className='text-lg uppercase'>Woman</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            {/*<hr/>*/}
                            <div className='flex py-7'>
                                <h1 className='text-2xl'>Ages:</h1>
                                <div className='ml-4 text-2xl'>
                                    <Select
                                        style={{
                                            width: 60, marginRight:10
                                        }}
                                        defaultValue={{
                                            value: '18',
                                            label: '18',
                                        }}
                                        options={[
                                            {
                                                value: '18',
                                                label: '18',
                                            },
                                            {
                                                value: '20',
                                                label: '20',
                                            },
                                            {
                                                value: '24',
                                                label: '24',
                                            },
                                        ]}
                                    />
                                    -
                                    <Select
                                        style={{
                                            width: 60, marginLeft: 10
                                        }}
                                        defaultValue={{
                                            value: '30',
                                            label: '30',
                                        }}
                                        options={[
                                            {
                                                value: '30',
                                                label: '30',
                                            },
                                            {
                                                value: '35',
                                                label: '35',
                                            },
                                            {
                                                value: '40',
                                                label: '40',
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="flex my-10">
                                <button className='text-lg text-white' >Join Now!</button>
                            </div>

                        </div>
                    </div>
                    <img className="col-span-2 w-90 " src="./img/aimg1.png" alt=""/>
                </div>

            </div>

        </div>
    );
}

export default Main1;