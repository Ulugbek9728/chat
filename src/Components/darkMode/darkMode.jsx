import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';

function DarkMode() {
    const onChange = (checked) => {
        localStorage.setItem("tema", JSON.stringify(checked));
    };
    return (
        <div>
            <Space direction="vertical">
                <Switch
                    onChange={onChange}
                    checkedChildren={<SunOutlined />}
                    unCheckedChildren={<MoonOutlined />}
                    defaultChecked
                />
            </Space>

        </div>
    );
}

export default DarkMode;