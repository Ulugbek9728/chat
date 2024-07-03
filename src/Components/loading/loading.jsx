import "./loading.css"

function Loading() {
    return (
        <div className='mt-32'>
            <div className="loader">
                <div className="inner_loader"></div>
            </div>
            <p className="text-black text-center mt-3 ">Ищем свободного собеседника...</p>
            <div className="flex mt-20">
                <button className="text-lg text-white Partner px-9 py-2.5 my-20 mx-auto">Остановить поиск</button>
            </div>
        </div>
    );
}

export default Loading;