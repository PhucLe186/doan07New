import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./BillForm.module.scss";

const BillForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const existingBill = location.state?.bill;

    const [bill, setBill] = useState({
        id: "",
        customer: "",
        table: "",
        status: "Chưa thanh toán",
        items: [],
        total: 0
    });

    useEffect(() => {
        if (existingBill) {
            setBill(existingBill);
        }
    }, [existingBill]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBill({ ...bill, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Hóa đơn ${id ? "đã cập nhật" : "đã tạo"} thành công!`);
        navigate("/bills");
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{id ? "Chỉnh sửa hóa đơn" : "Tạo hóa đơn mới"}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Mã hóa đơn:
                    <input type="text" name="id" value={bill.id} onChange={handleChange} disabled />
                </label>

                <label>
                    Tên khách hàng:
                    <input type="text" name="customer" value={bill.customer} onChange={handleChange} required />
                </label>

                <label>
                    Số bàn:
                    <input type="number" name="table" value={bill.table} onChange={handleChange} required />
                </label>

                <label>
                    Trạng thái:
                    <select name="status" value={bill.status} onChange={handleChange}>
                        <option value="Chưa thanh toán">Chưa thanh toán</option>
                        <option value="Đã thanh toán">Đã thanh toán</option>
                    </select>
                </label>

                <h3 className={styles.subTitle}>Danh sách món ăn</h3>
                <ul className={styles.itemsList}>
                    {bill.items.map((item, index) => (
                        <li key={index} className={styles.item}>
                            {item.name} - {item.quantity} x {item.price.toLocaleString()} VND
                        </li>
                    ))}
                </ul>

                <h3 className={styles.total}>Tổng tiền: {bill.total.toLocaleString()} VND</h3>

                <div className={styles.actions}>
                    <button type="submit" className={styles.saveButton}>
                        {id ? "Lưu chỉnh sửa" : "Tạo hóa đơn"}
                    </button>
                    <button type="button" className={styles.cancelButton} onClick={() => navigate("/bills")}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BillForm;
