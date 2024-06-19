import {style} from "../../utils/style.js";

function Main2() {
    return (
        <div className='my-32 '>
            <div className={`${style.container} grid grid-cols-4 gap-7`}>
                <div className="py-10 flex flex-col bg-white rounded-3xl hover:drop-shadow-2xl duration-300">
                    <img src="./img/icon01.png" alt="icon1" className='w-32 h-auto mx-auto'/>
                    <h1 className="text-2xl text-center font-bold mt-8">100% Verifide</h1>
                </div>
                <div className="py-10 flex flex-col bg-white rounded-3xl hover:drop-shadow-2xl duration-300">
                    <img src="./img/icon02.png" alt="icon2" className='w-32 h-auto mx-auto'/>
                    <h1 className="text-2xl text-center font-bold mt-3">Most Secure</h1>

                </div>
                <div className="py-10 flex flex-col bg-white rounded-3xl hover:drop-shadow-2xl duration-300">
                    <img src="./img/icon03.png" alt="icon3" className='w-32 h-auto mx-auto'/>
                    <h1 className="text-2xl text-center font-bold mt-6">100% Privacy</h1>

                </div>
                <div className="py-10 flex flex-col bg-white rounded-3xl hover:drop-shadow-2xl duration-300">
                    <img src="./img/icon04.png" alt="icon4" className='w-32 h-auto mx-auto'/>
                    <h1 className="text-2xl text-center font-bold mt-3">Smart Matching</h1>
                </div>
            </div>


        </div>
    );
}

export default Main2;