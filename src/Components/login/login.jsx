import "./login.css"
import Navbar from "@/Components/navbar/navbar.jsx";
import Footer from "@/Components/footer/footer.jsx";

function Login() {
    return (
        <div style={{width: "100vw", height: "81vh"}} className="">
            <Navbar/>
            <section className="gradient-form h-full bg-blue-50">
                <div className="container bg-blue-50 h-full p-10">
                    <div
                        className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div className="block rounded-lg shadow-lg bg-bluee">
                                <div className="g-0 lg:flex lg:flex-wrap">
                                    <div className="px-4 md:px-0 lg:w-6/12">
                                        <div className="md:mx-6 md:p-12">
                                            <div className="text-center">
                                                <img className="mx-auto w-48"
                                                     src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                     alt="logo"/>
                                                <h4 className="mb-12 pb-1 text-xl font-semibold">
                                                    We are G-lam Team
                                                </h4>
                                            </div>

                                            <form className="w-full max-w-sm">
                                                <div className="md:flex md:items-center mb-6">
                                                    <div className="md:w-1/3">
                                                        <label
                                                            className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                                                            form="inline-full-name">
                                                            Full Name
                                                        </label>
                                                    </div>
                                                    <div className="md:w-2/3">
                                                        <input
                                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                            id="inline-full-name" type="text"/>
                                                    </div>
                                                </div>
                                                <div className="md:flex md:items-center mb-6">
                                                    <div className="md:w-1/3">
                                                        <label
                                                            className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                                                            form="inline-password">
                                                            Password
                                                        </label>
                                                    </div>
                                                    <div className="md:w-2/3">
                                                        <input
                                                            className="bg-gray-200 appearance-none border-2 border-gray-200
                                                             rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                            id="inline-password" type="password"
                                                            placeholder="******************"/>
                                                    </div>
                                                </div>

                                                <div className="md:flex md:items-center">
                                                    <div className="md:w-1/2"></div>
                                                    <div className="w-full">
                                                        <button
                                                            style={{background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}
                                                            className="shadow w-full
                                                             focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                                            type="button">
                                                            Sign Up
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                                        style={{background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}>
                                        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                            <h4 className="mb-6 text-xl font-semibold">
                                                We are more than just a company
                                            </h4>
                                            <p className="text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco laboris nisi ut aliquip ex
                                                ea commodo consequat.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
);
}

export default Login;