import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './table.module.scss';
import { useState, useEffect } from 'react';
import routesconfig from '~/config/routes';
import { object } from 'prop-types';

const cx = classNames.bind(styles);
function Order() {
    const [selected, setSelected] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('');
    const [note, setNote] = useState('');
    console.log(phone);
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get('http://localhost:5000/cart/', { withCredentials: true });
                const cartData = res.data;

                const cartItemsArray = Object.keys(cartData).map((key) => {
                    return {
                        ID_MonAn: key,
                        ...cartData[key],
                    };
                });
                setCartItems(cartItemsArray);
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy menu');
            }
        };
        fetchCart();
    }, []);
    console.log(cartItems);
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.ThanhTien * item.soLuong, 0);
    };

    const deleteItem = async (item) => {
        console.log('ID món ăn cần xóa:', item.ID_MonAn);
        if (!item.ID_MonAn) {
            console.error(' Lỗi: ID món ăn không hợp lệ');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:5000/cart2',
                { ID_MonAn: item.ID_MonAn },
                { withCredentials: true },
            );

            setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.ID_MonAn !== item.ID_MonAn));
        } catch (error) {
            alert(error.response?.data?.message || 'Lỗi khi xóa món');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart')}>
                <div className={cx('cart-item')}>
                    <table className={cx('cart-table')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Món ăn</th>
                                <th>Giá bán</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img src={item.HinhAnhMon} alt={item.name} className={cx('food-image')} />{' '}
                                        {item.TenMonAn}
                                    </td>
                                    <td>{item.ThanhTien}.toLocaleString() đ</td>
                                    <td>
                                        <button className={cx('btn')}>-</button>
                                        <span className={cx('quantity')}>{item.soLuong}</span>
                                        <button className={cx('btn')}>+</button>
                                    </td>
                                    <td>{(item.ThanhTien * item.soLuong).toLocaleString()} đ</td>
                                    <td>
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                deleteItem(item);
                                            }}
                                            className={cx('delete-btn')}
                                        >
                                            🗑
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={cx('total')}>
                <h3 className={cx('number')}>Tổng tiền: {getTotalPrice().toLocaleString()} VND</h3>
            </div>
            <div className={cx('form')}>
                <h2 className={cx('text')}> THÔNG TIN ĐẶT BÀN</h2>
                <form className={cx('parent')} action={routesconfig.home}>
                    <div className={cx('inner')}>
                        <input
                            className={cx('input')}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="nhập họ và tên...."
                            required
                        />
                        <select className={cx('input')} value={selected} onChange={(e) => setSelected(e.target.value)}>
                            <option value="">-- Chọn bàn --</option>
                            <option value="1">Bàn 1</option>
                            <option value="2">Bàn 2</option>
                            <option value="3">Bàn 3</option>
                            <option value="4">Bàn 4</option>
                        </select>
                    </div>
                    <div className={cx('inner')}>
                        <input
                            min="1"
                            max="50"
                            step="1"
                            className={cx('input')}
                            type="number"
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="nhập số lượng"
                            required
                        />
                        <input
                            className={cx('input')}
                            type="datetime-local"
                            min={new Date().toISOString().slice(0, 16)}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="số điện thoại"
                            required
                        />
                        <input
                            className={cx('input')}
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nhập số điện thoại"
                            pattern="[0-9]{10}"
                            required
                        />
                    </div>
                    <textarea
                        rows="5"
                        cols="50"
                        className={cx('note')}
                        placeholder="Nhập ghi chú..."
                        maxlength="200"
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                    <button className={cx('buton')} type="submit">
                        đặt bàn
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Order;
