import {message, Popconfirm, Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import {domen} from "@/domen.jsx";


function BlockUsers() {
    const [fulInfoAdmin] = useState(JSON.parse(localStorage.getItem("AdminInfo")));
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 100,
        },
    });
    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        return () => {
            GetALLUser(tableParams.pagination.current, tableParams.pagination.pageSize,)
        }
    }, []);

    function GetALLUser(page, size,) {
        axios.get(`${domen}/user/admin/list`, {
            headers: {"Authorization": "Bearer " + fulInfoAdmin?.token},
            params: {
                size,
                page: page - 1,
                status: "BLOCKED"
            }
        }).then((response) => {
            console.log(response.data.content)
            setAllUser(response?.data?.content);
            setTableParams({
                ...tableParams,
                pagination: {
                    pageSize: response.data.size,
                    total: response.data.totalElements,
                }
            })
        }).catch((error) => {
            console.log(error.response)
        })
    }

    const confirm = (e) => {
        axios.put(`${domen}/user/update-status`,{
            userId:e.userId,
            status:'ACTIVE'
        },{
            headers: {"Authorization": "Bearer " + fulInfoAdmin?.token},
        }).then(()=>{
            GetALLUser(1, 10,)
            message.success('Foydalanuvchi bloklandi');
        }).catch((error)=>{
            console.log(error)
            message.error('erorr blok')
        })
    };

    const columns = [
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
        },
        {
            title: 'SRC Gender',
            dataIndex: 'partnerGender',
        },
        {
            title: 'SRC Age',
            render: (item, index) => (
                <div key={index}>
                    {item.partnerAges.map((item,index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>)
        },
        {
            title: "Edit status",
            render: (e) =>(
                <Popconfirm
                    title="Bloklash"
                    description="Ushbu foydalanuvchini bloklamoqchimisiz?"
                    onConfirm={()=>confirm(e)}
                    okText="Ha"
                    cancelText="Yo'q"
                >
                    <div className="flex">

                        <div className="bg-yellow-500 text-white rounded-xl p-2 cursor-pointer">
                            Blokdan chiqarish
                        </div>
                    </div>

                </Popconfirm>
            )

        }
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={allUser?.map(item => {
                    return {
                        ...item,
                        key: item?.userId,
                    }
                })}
                pagination={{
                    total: tableParams.pagination.total,
                    pageSize: tableParams.pagination.pageSize,
                    onChange: (page, pageSize) => {
                        GetALLUser(page, pageSize);
                    }
                }}
                scroll={{
                    y: 640,
                }}
            />
        </div>
    );
}

export default BlockUsers;