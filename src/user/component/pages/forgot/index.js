import { useState } from 'react';
import { resetPassword } from './resetpw';
import classNames from 'classnames/bind';
import styles from './forgot.module.scss';

const cx = classNames.bind(styles);
function Forgot() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword(email, setError);
    };

    return (
        <div className={cx('from')}>
            <h2>Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <h2>{error}</h2>
                <button type="submit">Gửi email</button>
            </form>
        </div>
    );
}

export default Forgot;
