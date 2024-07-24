import Navbar from "./navbar/navbar.jsx";
import img from "../../public/img/404.svg"
import Footer from "@/Components/footer/footer.jsx";

function PageNotFound() {
    return (
        <div>
            <Navbar/>
            <div style={{height:"82vh"}} className=" w-full bg-blue-50 pt-20">
                <img className='mx-auto w-96' src={img} alt=""/>
            </div>
            <Footer/>
        </div>
    );
}

export default PageNotFound;