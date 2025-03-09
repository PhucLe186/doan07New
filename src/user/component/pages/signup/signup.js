import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './signup.module.scss';
import { Authservice } from './authservice';
const cx = classNames.bind(styles);

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Nhập lại mật khẩu
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setaddress] = useState('');
    const [error, setError] = useState('');

    const Navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        const resuilt = await Authservice(name, phone, email, password, address, confirmPassword, setError, Navigate);
        if (resuilt && resuilt.success) {
            return;
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <input
                type="text"
                placeholder="họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="username"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
            />
            <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
            />
            <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="new-phone"
            />
            <input type="text" placeholder="address" value={address} onChange={(e) => setaddress(e.target.value)} />
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            <button type="submit">Đăng ký</button>
        </form>
    );
}

export default Signup;
