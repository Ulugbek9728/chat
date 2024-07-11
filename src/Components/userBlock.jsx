import img from "../../public/img/Security.svg"
function UserBlock() {
    return (
        <div>
            <div style={{height:"81vh"}} className=" bg-blue-50 pt-20">
                <p className='text-center text-sky-800 font-bold text-4xl'>Siz bu platformadan bloklandingiz !</p>
                <img style={{width:'30%'}} className='mx-auto' src={img} alt=""/>
            </div>
        </div>
    );
}

export default UserBlock;