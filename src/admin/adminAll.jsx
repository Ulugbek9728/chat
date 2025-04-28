import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
const { Header, Sider, Content } = Layout;


import "./admin.scss"
import {Route, Routes} from "react-router";
import AllChats from "./AllChats.jsx";
import BlockUsers from "./BlockUsers.jsx";
import AllStatistika from "./AllStatistika.jsx";
import {Link, useNavigate} from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher/index.jsx";
function AdminAll() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    function LogOut() {
        localStorage.removeItem("AdminInfo");
        navigate("/")
    }
    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <aside id="separator-sidebar" className=" w-55 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link to="/adminG-lam/" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                                            <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"/>
                                        </svg>
                                        {collapsed? '':<span className="ms-3">Barcha suxbatlar</span>}

                                    </Link>
                                </li>
                                <li>
                                    <Link to="/adminG-lam/blockuser" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                        </svg>
                                        {collapsed? '' : <span className="flex-1 ms-3 whitespace-nowrap">Bloklangan Userlar</span>}

                                    </Link>
                                </li>

                                <li>
                                    <Link to="/adminG-lam/statistics" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                        </svg>
                                        {collapsed? '':<span className="ms-3">Statistika</span>}

                                    </Link>
                                </li>

                            </ul>
                            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                                <li onClick={LogOut}>
                                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                        </svg>
                                        {collapsed? '':<span className="flex-1 ms-3 whitespace-nowrap">Log out</span>}
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </aside>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center",
                            paddingRight:"25px"
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                color:"white",
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <LanguageSwitcher/>

                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "88vh",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Routes>
                            <Route path={"/"} element={<AllChats/>}/>
                            <Route path={"/blockuser"} element={<BlockUsers/>}/>
                            <Route path={"/statistics"} element={<AllStatistika/>}/>
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default AdminAll;