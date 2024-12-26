import "./login.css"
import Navbar from "@/Components/navbar/navbar.jsx";
import {useEffect, useRef, useState} from "react";
import Footer from "@/Components/footer/footer.jsx";
import {style} from "@/utils/style.js";
import axios from "axios";
import {Form,Button, Input} from 'antd';
import {domen} from "../../domen.jsx"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Login() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const formRef = useRef(null);
    const [message, setMessage] = useState('');
    const [sucsessText, setSucsessText] = useState('');
    function Login(values) {
        const requestData = {
            login: values?.ism,
            password: values?.Parol
        };
        axios.post(`${domen}/api/v1/auth/login`, requestData).then((res) => {
            console.log(res)
            localStorage.setItem("AdminInfo", JSON.stringify(res.data));
            navigate("/adminG-lam");

        }).catch((e) => {
            console.log(e)
            setMessage(e?.message)
        })
    }

    useEffect(() => {
        setMessage('')
        setSucsessText('')
        notify();
    }, [message, sucsessText,]);

    function notify() {
        if (sucsessText !== '') {
            toast.success(sucsessText)
        }
        if (message !== '') {
            toast.error(message)
        }
    }
    return (
        <div className=" bg-blue-50 relative pb-20" >
            <Navbar/>

            <div className={`${style.container} w-full h-full py-20 2xl:py-36 pb-40 `}>
                <div className="w-full xl:w-2/3 mx-auto block rounded-lg shadow-lg bg-bluee">
                    <div className="p-4 md:px-0 lg:w-full">
                        <div className="md:mx-6 md:p-12">
                            <div className="text-center">
                                <img className="mx-auto w-14"
                                     src="./logo.png"
                                     alt="logo"/>
                                <h4 className="mb-12 pb-1 text-xl font-semibold">
                                    {t("login.title")}
                                </h4>
                            </div>
                            <Form
                                layout={{
                                    labelCol: {
                                        span: 8,
                                    },
                                    wrapperCol: {
                                        span: 16,
                                    },
                                }}
                                ref={formRef}
                                autoComplete="off"
                                onFinish={Login}
                            >
                                <Form.Item
                                    name="ism"
                                    rules={[
                                        {
                                            required: true,
                                            message: `${t("login.login_Message")}`,
                                            min: 1
                                        }
                                    ]}
                                >
                                    <div className="all-input">
                                        <Input
                                            type="text"
                                            placeholder={`${t("login.login")}`}
                                            name="ism"
                                        >
                                        </Input>
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="Parol"
                                    rules={[
                                        {
                                            required: true,
                                            message: `${t("login.password_Message")}`,
                                            min: 1
                                        }
                                    ]}
                                >
                                    <div className="all-input">
                                        <Input type={ "password"} placeholder={`${t("login.password")}`} name="Parol"/>
                                    </div>
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit"
                                        style={{background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}
                                        className="shadow w-full focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                        {t("login.button")}
                                    </Button>
                                </Form.Item>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default Login;