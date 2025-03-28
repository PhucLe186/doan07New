import { useEffect, useState } from 'react';
import LichSuDatBan from './bookhistory';
import axios from 'axios';

function HistoryBooking() {
    const [put, setPut] = useState([]);
    const [abort, setAbort] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('http://localhost:5000/detail/', { withCredentials: true });
            if (res.data.success) {
                const data = res.data.data;
                const cartItemsArray = Object.keys(data).map((key) => {
                    return {
                        ID_chitietban: key,
                        ...data[key],
                    };
                });
                const filteredData = cartItemsArray.filter((order) => order.trangthai === 1);
                const transformedData = filteredData.map((order) => ({
                    ...order,
                    MonAn: Object.values(order.MonAn).map((mon) => mon.TenMonAn),
                }));
                setPut(transformedData);
            }
        };
        fetchdata();
    }, []);
    console.log(put);
    const huyDon = (id) => {
        setPut((prev) => prev.filter((order) => order.id !== id));
        const huyOrder = put.find((order) => order.id === id);
        if (huyOrder) {
            huyOrder.status = 'Đã hủy';
            setAbort((prev) => [...prev, huyOrder]);
        }
    };

    return <LichSuDatBan put={put} abort={abort} huyDon={huyDon} />;
}

export default HistoryBooking;
