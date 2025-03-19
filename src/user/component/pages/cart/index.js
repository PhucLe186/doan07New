import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Vịt Quay Bắc Kinh',
            description:
                'Tuyệt phẩm gà quay da giòn rụm, thịt mềm thơm, ăn kèm bánh tráng, rau sống và nước sốt đặc biệt.',
            imageUrl: require('~/asset/img/vitquaybackinh.jpg'),
            price: 100,
            quantity: 1,
        },
        {
            id: 2,
            name: 'Gà Cung Bảo',
            description:
                'Món gà xào cay trứ danh Tứ Xuyên, với thịt gà mềm ngọt, ớt khô cay nồng, đậu phộng giòn bùi và sốt đậm đà.',
            imageUrl: require('~/asset/img/gacungbao.jpg'),
            price: 100,
            quantity: 2,
        },
        {
            id: 3,
            name: 'Thịt Kho Đông Pha',
            description: 'Món thịt ba chỉ kho kỳ công, mềm tan trong miệng, thấm đẫm gia vị đậm đà.',
            imageUrl: require('~/asset/img/thitkhodongpha.jpg'),
            price: 100,
            quantity: 1,
        },
        {
            id: 4,
            name: 'Lẩu Tứ Xuyên',
            description:
                'Nồi lẩu cay nồng, tê lưỡi đặc trưng Tứ Xuyên, với nước dùng đậm đà và đa dạng nguyên liệu nhúng kèm.',
            imageUrl: require('~/asset/img/laucaytuxuyen.jpg'),
            price: 100,
            quantity: 1,
        },
    ]);

    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
            ),
        );
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className={cx('cart-container')}>
            <h2 className={cx('cart-title')}>Giỏ Hàng</h2>
            {cartItems.map((item) => (
                <div key={item.id} className={cx('cart-item')}>
                    <img src={item.imageUrl} alt={item.name} className={cx('cart-item-image')} />
                    <div className={cx('cart-item-details')}>
                        <h3 className={cx('cart-item-name')}>{item.name}</h3>
                        <p className={cx('cart-item-description')}>{item.description}</p>
                        <p className={cx('cart-item-price')}>Giá: {item.price * item.quantity} VND</p>
                        <div className={cx('cart-item-controls')}>
                            <button
                                className={cx('cart-item-button', 'decrease')}
                                onClick={() => decreaseQuantity(item.id)}
                            >
                                -
                            </button>
                            <span className={cx('cart-item-quantity')}>{item.quantity}</span>
                            <button
                                className={cx('cart-item-button', 'increase')}
                                onClick={() => increaseQuantity(item.id)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className={cx('cart-total')}>
                <h3>Tổng tiền: {getTotalPrice()} VND</h3>
                <button className={cx('cart-checkout-button')}>Thanh Toán</button>
            </div>
        </div>
    );
}

export default Cart;
