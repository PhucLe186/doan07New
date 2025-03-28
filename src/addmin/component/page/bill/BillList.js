import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BillList.module.scss';
import billsData from './BillData';

const BillList = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Danh sách hóa đơn</h2>
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
                    {billsData.map((bill) => (
                        <tr key={bill.id}>
                            <td>{bill.id}</td>
                            <td>{bill.customer}</td>
                            <td>{bill.table}</td>
                            <td>
                                <span className={bill.status === 'Đã thanh toán' ? styles.paid : styles.unpaid}>
                                    {bill.status}
                                </span>
                            </td>
                            <td>
                                <Link to={`/bill/${bill.id}`} className={styles.detailButton}>
                                    Xem chi tiết
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillList;
