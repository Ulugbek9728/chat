import img from "../../public/img/Security.svg"
function UserBlock() {
    return (
        <div>
            <div style={{height:"81vh"}} className=" bg-blue-50 pt-20">
                <p className='text-center text-sky-800 font-bold text-4xl'>Siz bu platformadan bloklandingiz !</p>
                <img className='mx-auto w-96' src={img} alt=""/>
            </div>
        </div>
    );
}

export default UserBlock;