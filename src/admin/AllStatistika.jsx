import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {domen} from "@/domen.jsx";
import {PieChart} from '@mui/x-charts/PieChart';
import {Button, DatePicker, Form} from 'antd';
import {useTranslation} from "react-i18next";


function AllStatistika() {
    const [fulInfoAdmin] = useState(JSON.parse(localStorage.getItem("AdminInfo")));
    const {t} = useTranslation();

    const formRef = useRef(null);
    const [form] = Form.useForm();
    const [DateListe, setDateListe] = useState(['', '']);

    const [allInfo, setAllInfo] = useState([])

    useEffect(() => {
        return () => {
            GetALLStatistic()
        }
    }, []);

    function GetALLStatistic(e) {
        axios.get(`${domen}/user/statistics`, {
            headers: {"Authorization": "Bearer " + fulInfoAdmin?.token},
            params: {
                to: DateListe[1],
                from: DateListe[0]
            }
        }).then((response) => {
            setAllInfo(response?.data)
            console.log(response?.data.user)
        }).catch((error) => {
            console.log(error)
        })
    }

    const onChangeDate = (value, dateString) => {
        setDateListe(dateString)
    };

    return (
        <div>
            <Form form={form}
                  layout="vertical"
                  ref={formRef}
                  colon={false}
                  onFinish={GetALLStatistic}

            >
                <Form.Item label="Vaqt oralig'ini belgilang"
                           name="MurojatYuklash"
                           rules={
                               [
                                   {
                                       required: true,
                                       message: 'Malumot kiritilishi shart !!!'
                                   },
                               ]
                           }
                >
                    <DatePicker.RangePicker
                        name="MurojatYuklash" format="YYYY-MM-DD" onChange={onChangeDate}/>
                </Form.Item>
                <Form.Item>
                    <Button className="bg-bluee text-white p-2" htmlType="submit">
                        <span className="button__text">Chaqirish</span>
                    </Button>
                </Form.Item>
            </Form>
            <p>Yosh oralig'idagi foydalanuvchilar</p>
            <PieChart
                series={[{
                    data: [
                        {
                            id: 0,
                            value: allInfo?.user?.age[0]?.count,
                            label: `${allInfo?.user?.age[0]?.name === "TO_17" ? t("Home.TO_17") : allInfo?.user?.age[0]?.name} - ${allInfo?.user?.age[0]?.count}`
                        },
                        {
                            id: 1,
                            value: allInfo?.user?.age[1]?.count,
                            label: `${allInfo?.user?.age[1]?.name === "FROM_18_TO_22" ? t("Home.FROM_18_TO_22") : allInfo?.user?.age[1]?.name} - ${allInfo?.user?.age[1]?.count}`
                        },
                        {
                            id: 2,
                            value: allInfo?.user?.age[2]?.count,
                            label: `${allInfo?.user?.age[2]?.name === "FROM_22_TO_25" ? t("Home.FROM_22_TO_25") : allInfo?.user?.age[2]?.name} - ${allInfo?.user?.age[2]?.count}`
                        },
                        {
                            id: 3,
                            value: allInfo?.user?.age[3]?.count,
                            label: `${allInfo?.user?.age[3]?.name === "FROM_26_TO_35" ? t("Home.FROM_26_TO_35") : allInfo?.user?.age[3]?.name} - ${allInfo?.user?.age[3]?.count}`
                        },
                        {
                            id: 4,
                            value: allInfo?.user?.age[4]?.count,
                            label: `${allInfo?.user?.age[4]?.name === "FROM_36" ? t("Home.FROM_36") : allInfo?.user?.age[4]?.name} - ${allInfo?.user?.age[4]?.count}`
                        },],
                }
                ]}
                height={250}
                xAxis={[{data: ['Q1'], scaleType: 'band', categoryGapRatio: 0.05, barGapRatio: 1}]}
                margin={{top: 10, bottom: 30, left: 40, right: 10}}
            />
            <hr/>
            <p>Jinsi bo'yicha foydalanuvchilar</p>

            <PieChart
                series={[{
                    data: [
                        {
                            id: 0,
                            value: allInfo?.user?.gender[0]?.count,
                            label: `${allInfo?.user?.gender[0]?.name === "MALE" ? t("Home.MALE") : t("Home.MALE")} - ${allInfo?.user?.gender[0]?.count}`
                        },
                        {
                            id: 1,
                            value: allInfo?.user?.gender[1]?.count,
                            label: `${allInfo?.user?.gender[1]?.name === "FEMALE" ? t("Home.FEMALE") : allInfo?.user?.gender[1]?.name} - ${allInfo?.user?.gender[1]?.count}`
                        },
                        {
                            id: 2,
                            value: allInfo?.user?.gender[2]?.count,
                            label: `${allInfo?.user?.gender[2]?.name === "DOES_NOT_HAVE" ? t("Home.DOES_NOT_HAVE") : allInfo?.user?.gender[2]?.name} - ${allInfo?.user?.gender[2]?.count}`
                        },],
                },
                ]}
                height={250}
            />
        </div>
    );
}

export default AllStatistika;