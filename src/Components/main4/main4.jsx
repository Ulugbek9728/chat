import "./main4.scss"
import {style} from "../../utils/style.js";

function Main4() {
    return (
        <div className='main4'>
            <div className={`${style.container} text-center py-24`}>
                <h2 className='text-2xl font-bold text-indigo-600'>Meet New People Today!</h2>
                <h2 className='text-5xl font-bold mt-2'>How Does It Work?</h2>
                <p className='text-xl font-thin mt-2'>
                    You’re just 3 steps away from a great date
                </p>
                <div className="grid grid-cols-3 gap-7 mt-10">
                    <div className="py-10 flex flex-col bg-white rounded-3xl hover:drop-shadow-2xl duration-300">
                        <div className="relative">
                            <img src="./img/icon1.png" alt="icon1" className='w-60 h-auto mx-auto'/>
                            <button className='text-lg text-white Partner w-10 h-10 absolute bottom-3 right-24' >01</button>
                        </div>
                        <h1 className="text-2xl text-center font-bold mt-8">Tell us who you are!</h1>
                        <button className='text-lg text-white Partner w-32 mx-auto my-5 px-5 py-2.5' >Join Now</button>

                    </div>
                    <div className="py-10 flex flex-col bg-white rounded-3xl hover:drop-shadow-2xl duration-300">
                        <div className="relative">
                            <img src="./img/icon2.png" alt="icon1" className='w-60 h-auto mx-auto'/>
                            <button className='text-lg text-white Partner w-10 h-10 absolute bottom-3 right-24' >02</button>
                        </div>
                        <h1 className="text-2xl text-center font-bold mt-8">Find the right person</h1>
                        <button className='text-lg text-white Partner w-32 mx-auto my-5 px-5 py-2.5' >Join Now</button>

                    </div>

                    <div className="py-10 flex flex-col bg-white rounded-3xl hover:drop-shadow-2xl duration-300">
                        <div className="relative">
                            <img src="./img/icon3.png" alt="icon1" className='w-60 h-auto mx-auto'/>
                            <button className='text-lg text-white Partner w-10 h-10 absolute bottom-3 right-24' >03</button>
                        </div>
                        <h1 className="text-2xl text-center font-bold mt-8">Start Dating</h1>
                        <button className='text-lg text-white Partner w-32 mx-auto my-5 px-5 py-2.5' >Join Now</button>

                    </div>

                </div>
            </div>


        </div>
    );
}

export default Main4;