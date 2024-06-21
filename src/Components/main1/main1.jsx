import "./main1.scss"
import {style} from "../../utils/style.js";
import { Flex, Radio } from 'antd';
import DarkMode from "../darkMode/darkMode.jsx";

function Main1() {

    return (

        <div className='main'>
            <div className={`${style.container}`}>
                <div className="grid grid-cols-2 gap-5 xl:gap-16 ">
                    <div className=''>
                        <p className='text-white text-4xl font-bold uppercase'>
                            find friend youre life
                        </p>
                        <div className=" dark:bg-primary w-full bg-blue-50 rounded-3xl drop-shadow-2xl mt-10 p-5">
                            <div className="flex gap-2">
                                <DarkMode/>
                            </div>
                            <p className='mt-5'>Тема общения:</p>
                            <Flex vertical gap="middle">
                                <Radio.Group defaultValue="a" buttonStyle="solid" className='h-11 flex justify-between'>
                                    <Radio.Button className='bg-slate-800 rounded-lg text-white h-full pt-1.5 px-16' value="a">Oбшение</Radio.Button>
                                    <Radio.Button className='bg-slate-800 rounded-lg text-white h-full pt-1.5 px-16 ' value="b">Флирт 18+</Radio.Button>
                                    <Radio.Button className='bg-slate-800 rounded-lg text-white h-full pt-1.5 px-16 ' value="c">Ролка</Radio.Button>
                                </Radio.Group>
                            </Flex>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="w-full">
                                    <p>Ваш пол:</p>
                                    <Flex vertical gap="middle">
                                        <Radio.Group defaultValue="a" buttonStyle="solid" className='h-11'>
                                            <Radio.Button className='bg-slate-800 text-white h-full w-24 pt-1.5' value="a">Некто</Radio.Button>
                                            <Radio.Button className='bg-slate-800 text-white h-full w-20 pt-1.5' value="b">M</Radio.Button>
                                            <Radio.Button className='bg-slate-800 text-white h-full w-20 pt-1.5' value="c">Ж</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                                <div className="w-full">
                                    <p>Пол собеседника:</p>
                                    <Flex vertical gap="middle">
                                        <Radio.Group defaultValue="a" buttonStyle="solid" className='h-11'>
                                            <Radio.Button className='bg-slate-800 text-white h-full w-24 pt-1.5' value="a">Не важно</Radio.Button>
                                            <Radio.Button className='bg-slate-800 text-white h-full w-20 pt-1.5' value="b">M</Radio.Button>
                                            <Radio.Button className='bg-slate-800 text-white h-full w-20 pt-1.5' value="c">Ж</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="flex flex-col gap-2">
                                    <p>Пол собеседника:</p>
                                    <Flex vertical={false} gap="middle">
                                        <Radio.Group defaultValue="a" buttonStyle="solid" className=''>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="a">Oбшение</Radio.Button>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="b">Флирт 18+</Radio.Button>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="d">Ролка</Radio.Button>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="e">Флирт 18+</Radio.Button>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="f">Ролка</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Пол собеседника:</p>
                                    <Flex vertical={false} gap="middle">
                                        <Radio.Group defaultValue="a" buttonStyle="solid" className=''>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="a">Oбшение</Radio.Button>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="b">Флирт 18+</Radio.Button>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="d">Ролка</Radio.Button>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="e">Флирт 18+</Radio.Button>
                                            <Radio.Button className='bg-slate-800 rounded-lg mt-2 w-full text-white h-11 pt-1.5' value="f">Ролка</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className='text-lg text-white Partner mt-10 mb-5 px-9 py-2.5 my-20 ' >Начать чат</button>

                            </div>

                        </div>
                    </div>
                    <img className="aim mt-32" src="./img/aim1.png" alt=""/>
                </div>

            </div>

        </div>
    );
}

export default Main1;