import {Space, Table, Modal,Alert, Flex, Spin, Input } from 'antd';
import axios from "axios";
import {domen} from "../domen.jsx"
import {useEffect, useState} from "react";
import "./admin.scss";

const { Search } = Input;


const {Column, ColumnGroup} = Table;

const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;

function AllChats() {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 100,
        },
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fulInfoAdmin] = useState(JSON.parse(localStorage.getItem("AdminInfo")));
    const [allChats, setAllChats] = useState([])
    const [messages, setMessages] = useState([])
    const [messagesLoading, setMessagesLoading] = useState(false)
    const [src, setSrc] = useState(null)

    useEffect(() => {

        return () => {
            GetALLChat(tableParams.pagination.current, tableParams.pagination.pageSize, src)
        }

    }, []);

    function GetALLChat(page, size,query) {
        axios.get(`${domen}/chat-admin/list`, {
            headers: {"Authorization": "Bearer " + fulInfoAdmin?.token},
            params: {
                size,
                 page:page-1,
                query:query
            }
        }).then((response) => {
            setAllChats(response?.data?.content);
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

    const showModal = (e) => {
        setIsModalOpen(true);
        setMessagesLoading(true)
        axios.get(`${domen}/message/${e}`, {
            headers: {"Authorization": "Bearer " + fulInfoAdmin?.token},

        }).then((response) => {
            console.log(response.data)
            setMessagesLoading(false)

            setMessages(response.data)
        }).catch((error) => {
            setMessagesLoading(false)
            console.log(error)
        })
    };
    return (
        <div>
            <Modal title="Basic Modal"
                   open={isModalOpen}
                   onOk={()=>setIsModalOpen(false)}
                   onCancel={()=>setIsModalOpen(false)}>
                {
                    messagesLoading ? <Flex gap="middle" vertical className="h-96">
                        <Spin tip="Loading...">
                            <Alert
                                message="Malumot yuklanmoqda"
                                description="Iltimos oynani yopmang!"
                                type="info"
                            />
                        </Spin>
                    </Flex>:
                        <div className="h-96 overflow-y-auto">
                            {messages?.map(item => {
                                const oneMessage = messages[0].senderId;
                                return (
                                    <div key={item?.messageId}>
                                        {
                                            oneMessage=== item?.senderId ?
                                                <div className="flex justify-end mt-1"
                                                     key={item?.messageId}>
                                                    <div
                                                        className="bg-blue-200 text-black p-2 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl max-w-xs">
                                                        {item?.content}
                                                    </div>
                                                </div>
                                                :
                                                <div className="flex mt-1" key={item?.messageId}>
                                                    <div
                                                        className="bg-gray-300 text-black p-2 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl max-w-xs">
                                                        {item?.content}
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>


                }

            </Modal>
            <Search placeholder="chat search text" className="w-96 mb-3" enterButton
                    onSearch={(e)=> {
                        setSrc(e)
                        e==="" ? GetALLChat(1, tableParams.pagination.pageSize,) :
                            GetALLChat(1, tableParams.pagination.pageSize, e)}}/>
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
                        GetALLChat(page, pageSize, src);
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
                                    setMessages([])
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