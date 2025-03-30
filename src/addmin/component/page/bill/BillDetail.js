import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import styles from "./BillDetail.module.scss";

const BillDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bill, setBill] = useState(null); 

    // 🔹 Load dữ liệu từ API hoặc database
    useEffect(() => {
        const fetchBill = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bills/${id}`);
                setBill(response.data);
            } catch (error) {
                console.error("❌ Không tìm thấy hóa đơn!", error);
                setBill(null); 
            }
        };

        fetchBill();
    }, [id]);

    if (!bill) {
        return <h2 className={styles.notFound}>Hóa đơn không tồn tại!</h2>;
    }

    
    const handleEdit = () => {
        navigate(`/bills/edit/${bill.id}`, { state: { bill } });
    };

    
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/bills/${id}`);
            alert("✅ Đã xóa hóa đơn!");
            navigate("/bills"); 
        } catch (error) {
            console.error("❌ Lỗi khi xóa hóa đơn!", error);
            alert("❌ Không thể xóa hóa đơn!");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Chi tiết hóa đơn #{bill.id}</h2>
            <div className={styles.info}>
                <p><strong>Khách hàng:</strong> {bill.customer}</p>
                <p><strong>Bàn:</strong> {bill.table}</p>
                <p><strong>Trạng thái:</strong> 
                    <span className={bill.status === "Đã thanh toán" ? styles.paid : styles.unpaid}>
                        {bill.status}
                    </span>
                </p>
            </div>

            <h3 className={styles.subTitle}>Danh sách món ăn</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Món</th>
                        <th>Đơn giá (VND)</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {bill.items?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price.toLocaleString()}</td>
                            <td>{item.quantity}</td>
                            <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className={styles.total}>Tổng tiền: {bill.total.toLocaleString()} VND</h3>

            <div className={styles.actions}>
                <button className={styles.editButton} onClick={handleEdit}>Sửa</button>
                <button className={styles.deleteButton} onClick={handleDelete}>Xóa</button>
                <Link to="/bills" className={styles.backButton}>Quay lại danh sách</Link>
            </div>
        </div>
    );
};

export default BillDetail;
