import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./BillList.module.scss";

const BillList = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bills") 
      .then((response) => {
        setBills(response.data); 
      })
      .catch((error) => {
        console.error("❌ Lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Danh sách hóa đơn</h2>
      <Link to="/bills/add" className={styles.addButton}>+ Thêm hóa đơn</Link>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã hóa đơn</th>
            <th>Khách hàng</th>
            <th>Bàn</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bills.length > 0 ? (
            bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.id}</td>
                <td>{bill.customer}</td>
                <td>{bill.table}</td>
                <td className={bill.status === "Đã thanh toán" ? styles.paid : styles.unpaid}>
                  {bill.status}
                </td>
                <td>
                  <Link to={`/bills/${bill.id}`} className={styles.detailButton}>
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={styles.noData}>Không có hóa đơn nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillList;
