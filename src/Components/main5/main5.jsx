import {style} from "../../utils/style.js";

function Main5() {
    return (
        <div className={`${style.container}`}>
            <div className="grid grid-cols-3 gap-7 mt-10">
                <div className="py-10 flex flex-col justify-center">
                    <div className=" w-60 h-60 bg-blue-200 rounded-full mx-auto">
                        <img src="./img/stat01.png" alt="icon1" className='w-32 h-auto mx-auto mt-5'/>
                    </div>
                    <h1 className="text-2xl text-center font-bold mt-3">350 M</h1>
                    <p className='text-xl text-center font-thin mt-2'>Tickets Booked</p>
                </div>
                <div className="py-10 flex flex-col ">
                    <div className="w-60 h-60 bg-blue-200 rounded-full mx-auto">
                        <img src="./img/stat02.png" alt="icon2" className='w-32 h-auto mx-auto mt-5'/>
                    </div>
                    <h1 className="text-2xl text-center font-bold mt-3">447M</h1>
                    <p className='text-xl text-center font-thin mt-2'>Usefull Sessions</p>
                </div>
                <div className="py-10 flex flex-col ">
                    <div className="w-60 h-60 bg-blue-200 rounded-full mx-auto">
                        <img src="./img/stat03.png" alt="icon3" className='w-32 h-auto mx-auto mt-5'/>
                    </div>
                    <h1 className="text-2xl text-center font-bold mt-3">60M</h1>
                    <p className='text-xl text-center font-thin mt-2'>Talented Speakers</p>
                </div>
            </div>

        </div>
    );
}

export default Main5;