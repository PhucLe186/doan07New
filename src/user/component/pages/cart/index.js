import { database } from '../../../../firebase'; // Import đúng cách
import { ref, set } from 'firebase/database'; // Kiểm tra lại đường dẫn import Firebase
import classNames from 'classnames/bind';
import styles from './cart.module.scss';

const cx = classNames.bind(styles);

const Cart = () => {
    const userId = 'ID_KhachHang_2';

    // Hàm lưu thông tin khách hàng vào Realtime Database
    const saveUserData = () => {
        const userRef = ref(database, 'khachhang/' + userId);
        set(userRef, {
            Username: 'hoangnhat',
            Password: 'hoangnhat@example.com',
        })
            .then(() => {
                console.log('Dữ liệu khách hàng đã được lưu.');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu dữ liệu khách hàng:', error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Giỏ hàng</h1>
            <button onClick={saveUserData}>Lưu thông tin khách hàng</button>
        </div>
    );
};

export default Cart;
