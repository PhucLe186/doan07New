import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './signup.module.scss'; // Chắc chắn sử dụng đúng file này
import { Authservice } from './authservice';

const cx = classNames.bind(styles);

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        const result = await Authservice(name, phone, email, password, address, confirmPassword, setError, navigate);
        if (result && result.success) {
            return;
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('formBox')}>
                <h2>Đăng Ký</h2>

                <form onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {error && <p className={cx('error')}>{error}</p>}
                    <button type="submit">Đăng Ký</button>
                </form>

                <p>
                    Đã có tài khoản?{' '}
                    <a href="#" onClick={() => navigate('/login')} className={cx('forgotPassword')}>
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
