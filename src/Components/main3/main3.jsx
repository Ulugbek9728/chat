import {style} from "../../utils/style.js";
import "./main3.scss"

function Main3() {
    return (
        <div className={`${style.container} grid grid-cols-2 gap-20`}>
            <div className=" dark:text-white">
                <h2 className='text-2xl font-bold dark:text-white text-sky-800'>Meet New People Today!</h2>
                <h2 className='text-6xl font-bold mt-5'>Start Flirting</h2>
                <p className='text-2xl font-thin mt-10'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, delectus eos fugiat labore
                    non quasi quo tenetur totam ut blanditiis consequatur eos id pariatur consectetur adipisicing.
                </p>
                <p className='text-2xl font-thin mt-10'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor illo illum quaerat qui sequi
                    voluptate voluptatem. Beatae blanditiis consequatur eos id pariatur similique soluta vitae. Libero
                    nesciunt provident quam sint.
                </p>
                <button className='text-lg text-white Partner px-5 py-2.5 my-20 ' >Seek Your Partner</button>
            </div>
            <div className="Main3left ">
                <img src="./img/circle.png" alt="" className='animate-pulse w-full circle'/>
                <img src="./img/illutration.png" alt="" className=' users'/>
            </div>

        </div>
    );
}

export default Main3;