import "./main1.scss"
import {style} from "../../utils/style.js";
import { Radio, Select  } from 'antd';
import DarkMode from "../darkMode/darkMode.jsx";

function Main1() {

    return (

        <div className='main'>
            <div className={`${style.container}`}>
                <div className="grid grid-cols-2 gap-5 xl:gap-16 mt-32">
                    <div className=''>
                        <p className='text-white text-4xl font-bold uppercase'>
                            find friend youre life
                        </p>
                        <div className=" w-full bg-white rounded-3xl drop-shadow-2xl mt-10 p-5">
                            <div className="flex gap-2">
                                <span>Kunduzgi rejim</span>
                                <DarkMode/>
                                <span>Tungi rejim</span>
                            </div>
                            <div className='flex py-7'>
                                <h1 className='text-2xl'>I am a:</h1>
                                <div className='ml-4 text-2xl'>
                                    <Radio.Group >
                                        <Radio value={1} className='text-lg uppercase'>Male</Radio>
                                        <Radio value={2} className='text-lg uppercase'>Female</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className='flex py-7 border border-b-gray border-t-gray border-l-0 border-r-0'>
                                <h1 className='text-2xl'>Seeking a:</h1>
                                <div className='ml-4 text-2xl'>
                                    <Radio.Group>
                                        <Radio value={1} className='text-lg uppercase'>Man</Radio>
                                        <Radio value={2} className='text-lg uppercase'>Woman</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
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
                                <button className='defultButontext-lg text-white' >Join Now!</button>
                            </div>

                        </div>
                    </div>
                    <img className="aim" src="./img/aim1.png" alt=""/>
                </div>

            </div>

        </div>
    );
}

export default Main1;