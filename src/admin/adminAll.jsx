import {AppstoreOutlined, BarChartOutlined, CloudOutlined,} from '@ant-design/icons';
import { Layout, Menu, theme, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import "./admin.scss"
function AdminAll() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = [
        { title: 'Home', key: 'home' },
        { title: 'Library', key: 'library' },
        { title: 'Data', key: 'data' },
    ];
    return (
        <div>
            <Layout>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div className="demo-logo" />
                    <Menu className="" theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={[
                            {
                                label:"Barcha suxbatlarni ko'rish",
                                key:"1",
                                icon:<AppstoreOutlined/>
                            },
                            {
                                label:"Bloklangan userlar",
                                key:"2",
                                icon:<BarChartOutlined/>
                            },
                            {
                                label:"Userlar haqida ma'lumot",
                                key:"3",
                                icon:<CloudOutlined />
                            },
                        ]} />
                </Header>

                <Layout
                    style={{
                        padding:50
                    }}
                >
                    <Header style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}>
                        <Breadcrumb className="p-5" items={items} />

                    </Header>
                    <Content
                        style={{
                            marginTop:"20px",
                            overflow: 'initial',
                        }}
                    >
                        <div
                            style={{
                                minHeight:"90vh",
                                textAlign: 'center',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <p>long content</p>
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </div>
    );
}

export default AdminAll;