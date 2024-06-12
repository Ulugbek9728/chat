// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./main1.scss"
import {style} from "../../utils/style.js";


function Main1() {
    return (

        <div className='main'>
            <div className={`${style.container}`}>
                <div className="grid grid-cols-3 gap-5 xl:gap-16 mt-20">
                    <div className="">
                        <p className='text-white text-6xl font-bold uppercase'>
                            find friend youre life
                        </p>
                        <div className=" w-full bg-white rounded-3xl drop-shadow-2xl mt-10 p-5">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda autem dicta
                            doloremque enim fuga fugit ipsam itaque iure mollitia nisi omnis perferendis quia ratione
                            rem repellat, tempore tenetur ut vitae voluptatum! Alias consectetur consequuntur corporis,
                            cum doloremque iste itaque, laborum magnam minima nulla perspiciatis quia reiciendis
                            temporibus, velit vitae voluptate voluptatem? Accusantium aliquam atque, autem consequatur
                            delectus eos et, eveniet ipsam nesciunt pariatur porro quas repellat tempora totam, velit!
                            Ad aliquid autem commodi esse est et quaerat, ratione velit veniam! Ab aliquid aspernatur
                            autem corporis cumque delectus dicta dolorem doloribus eaque enim error esse eum fuga hic in
                            iure maiores minus molestiae mollitia nobis non numquam omnis, perferendis possimus quam quo
                            quod reiciendis rem repellendus similique ullam vitae voluptates voluptatum. Ab adipisci


                        </div>
                    </div>
                    <img className="col-span-2 w-90 " src="./img/aimg1.png" alt=""/>
                </div>

            </div>

        </div>
    );
}

export default Main1;