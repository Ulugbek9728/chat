import {Space, Table, Modal} from 'antd';
import axios from "axios";
import {domen} from "../domen.jsx"
import {useEffect, useState} from "react";
import "./admin.scss";

const {Column, ColumnGroup} = Table;

function AllChats() {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 100
        },
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fulInfoAdmin] = useState(JSON.parse(localStorage.getItem("AdminInfo")));
    const [allChats, setAllChats] = useState([])
    const [messages, setMessages] = useState([])


    useEffect(() => {
        return () => {
            GetALLChat(tableParams.pagination.current, tableParams.pagination.pageSize)
        }

    }, []);

    function GetALLChat(page, pageSize) {
        axios.get(`${domen}/chat-admin/list`, {
            headers: {"Authorization": "Bearer " + fulInfoAdmin?.token},
            params: {
                size: pageSize,
                page: page - 1
            }
        }).then((response) => {
            setAllChats(response?.data?.content);
            setTableParams({
                ...tableParams,
                pagination: {
                    pageSize: response.data.size,
                    total: response.data.totalElements
                }
            })
        }).catch((error) => {
            console.log(error.response)
        })
    }

    const showModal = (e) => {
        setIsModalOpen(true);
        axios.get(`${domen}/message/${e}`, {
            headers: {"Authorization": "Bearer " + fulInfoAdmin?.token},

        }).then((response) => {
            console.log(response.data)
            setMessages(response.data)
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <div>
            <Modal title="Basic Modal"
                   open={isModalOpen}
                   onOk={()=>setIsModalOpen(false)}
                   onCancel={()=>setIsModalOpen(false)}>
                <div className="h-96 overflow-y-auto">

                </div>
            </Modal>
            <Table
                dataSource={allChats?.map(item => {
                    return {
                        ...item,
                        key: item?.chatId,
                        user1age: JSON.parse(item?.members)[0].age,
                        user1Gender: JSON.parse(item?.members)[0].gender,
                        user2age: JSON.parse(item?.members)[1]?.age,
                        user2Gender: JSON.parse(item?.members)[1]?.gender,
                        LastMesage: JSON.parse(item?.lastMessage)?.content,
                    }
                })}
                pagination={{
                    total: tableParams.pagination.total,
                    pageSize: tableParams.pagination.pageSize,
                    onChange: (page, pageSize) => {
                        GetALLChat(page, pageSize);
                    }
                }}
            >
                <Column title="Yaratilgan vaqti" dataIndex="createdDate" key="createdDate"/>
                <ColumnGroup title="User 1">
                    <Column title="Gender" dataIndex="user1Gender" key="user1Gender"/>
                    <Column title="Age" dataIndex="user1age" key="user1age"/>
                </ColumnGroup>
                <ColumnGroup title="User 2">
                    <Column title="Gender" dataIndex="user2Gender" key="user2Gender"/>
                    <Column title="Age" dataIndex="user2age" key="user2age"/>
                </ColumnGroup>

                <Column title="Last Chat" key="address"
                        render={(record) => (
                            <Space size="middle">
                                <a onClick={() => {
                                    showModal(record?.chatId)
                                }}>
                                    {record.LastMesage}
                                </a>
                            </Space>
                        )}
                />
                <Column title="Statusi" key="createdDate"
                        render={(record) => (

                            <Space size="middle">
                                <a> {record.status}</a>
                            </Space>
                        )}
                />

            </Table>
        </div>
    );
}

export default AllChats;