import classNames from 'classnames/bind';
import styles from './contact.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Manager() {
    const [bookings, setBookings] = useState([
        { id: 1, name: 'Nguyen Van A', time: '18:00', table: 5 },
        { id: 2, name: 'Tran Thi B', time: '19:30', table: 3 },
    ]);
    const [editingId, setEditingId] = useState(null);
    const [editedBooking, setEditedBooking] = useState({ id: null, name: '', time: '', table: '' });
    const [newBooking, setNewBooking] = useState({ name: '', time: '', table: '' });

    const handleDelete = (id) => {
        setBookings(bookings.filter((booking) => booking.id !== id));
    };

    const handleEdit = (booking) => {
        setEditingId(booking.id);
        setEditedBooking(booking);
    };

    const handleSave = () => {
        setBookings(bookings.map((b) => (b.id === editedBooking.id ? editedBooking : b)));
        setEditingId(null);
    };

    const handleChange = (e) => {
        setEditedBooking({ ...editedBooking, [e.target.name]: e.target.value });
    };

    const handleNewChange = (e) => {
        setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
    };

    const handleAddNew = () => {
        if (!newBooking.name || !newBooking.time || !newBooking.table) {
            alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
            return;
        }
        const newId = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;
        setBookings([...bookings, { id: newId, ...newBooking }]);
        setNewBooking({ name: '', time: '', table: '' });
    };

    return (
        <div className={cx('management-container')}>
            <h2>Quản Lý Đặt Bàn</h2>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Khách</th>
                        <th>Giờ</th>
                        <th>Bàn</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
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
