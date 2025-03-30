import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './contact.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Manager() {
    const [bookings, setBookings] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedBooking, setEditedBooking] = useState({ id: '', name: '', time: '', table: '' });
    const [newBooking, setNewBooking] = useState({ name: '', time: '', table: '' });

    // Lấy danh sách đặt bàn từ server
    useEffect(() => {
        axios
            .get('http://localhost:5000/manage')
            .then((response) => setBookings(Object.values(response.data)))
            .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);

    // Xóa đặt bàn
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/manage/delete/${id}`)
            .then(() => {
                setBookings(bookings.filter((booking) => booking.id !== id));
            })
            .catch((error) => console.error('Lỗi khi xóa:', error));
    };

    // Bắt đầu chỉnh sửa
    const handleEdit = (booking) => {
        setEditingId(booking.id);
        setEditedBooking(booking);
    };

    // Lưu chỉnh sửa
    const handleSave = () => {
        axios
            .put('http://localhost:5000/manage/update', editedBooking)
            .then(() => {
                setBookings(bookings.map((b) => (b.id === editedBooking.id ? editedBooking : b)));
                setEditingId(null);
            })
            .catch((error) => console.error('Lỗi khi cập nhật:', error));
    };

    // Xử lý nhập liệu khi chỉnh sửa
    const handleChange = (e) => {
        setEditedBooking({ ...editedBooking, [e.target.name]: e.target.value });
    };

    // Xử lý nhập liệu khi thêm mới
    const handleNewChange = (e) => {
        setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
    };

    // Thêm mới đặt bàn
    const handleAddNew = () => {
        if (!newBooking.name || !newBooking.time || !newBooking.table) {
            alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
            return;
        }

        axios
            .post('http://localhost:5000/manage/add', newBooking)
            .then((response) => {
                setBookings([...bookings, { id: response.data.id, ...newBooking }]);
                setNewBooking({ name: '', time: '', table: '' });
            })
            .catch((error) => console.error('Lỗi khi thêm mới:', error));
    };

    return (
        <div className={cx('management-container')}>
            <h2>Quản Lý Đặt Bàn</h2>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Khách</th>
                        <th>Giờ</th>
                        <th>Bàn</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking.id}>
                            <td>{index + 1}</td> {/* Hiển thị số thứ tự */}
                            <td>
                                {editingId === booking.id ? (
                                    <input type="text" name="name" value={editedBooking.name} onChange={handleChange} />
                                ) : (
                                    booking.name
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <input type="text" name="time" value={editedBooking.time} onChange={handleChange} />
                                ) : (
                                    booking.time
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <input
                                        type="number"
                                        name="table"
                                        value={editedBooking.table}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    booking.table
                                )}
                            </td>
                            <td>
                                {editingId === booking.id ? (
                                    <button className={cx('save-btn')} onClick={handleSave}>
                                        Lưu
                                    </button>
                                ) : (
                                    <button className={cx('edit-btn')} onClick={() => handleEdit(booking)}>
                                        Sửa
                                    </button>
                                )}
                                <button className={cx('delete-btn')} onClick={() => handleDelete(booking.id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form thêm khách hàng */}
            <div className={cx('add-customer-form')}>
                <h3>Thêm Khách Hàng Mới</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Tên khách hàng"
                    value={newBooking.name}
                    onChange={handleNewChange}
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Giờ đặt bàn"
                    value={newBooking.time}
                    onChange={handleNewChange}
                />
                <input
                    type="number"
                    name="table"
                    placeholder="Số bàn"
                    value={newBooking.table}
                    onChange={handleNewChange}
                />
                <button className={cx('add-btn')} onClick={handleAddNew}>
                    Thêm Khách Hàng
                </button>
            </div>
        </div>
    );
}

export default Manager;
