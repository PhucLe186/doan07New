import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { AuthContext } from '~/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '~/firebase';
import { ref, get } from 'firebase/database';
import routesconfig from '~/config/routes';
import Button from '~/component/Button';

const cx = classNames.bind(styles);

function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Kiểm tra nếu người dùng đã đăng nhập, điều hướng đến trang chủ
    if (user) {
        navigate(routesconfig.home);
    }

    // Xử lý sự kiện đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
            const uid = userCredential.user.uid;

            // Lấy thông tin từ Firebase Database
            const userRef = ref(database, `khachhang/${uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                console.log('Đăng nhập thành công:', snapshot.val());
                navigate(routesconfig.home); // Chuyển hướng về trang chủ sau khi đăng nhập
            } else {
                console.log('Không tìm thấy thông tin người dùng!');
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error.message);
            console.log('Sai email hoặc mật khẩu');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('formBox')}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    {/* Liên kết "Forgot password?" */}
                    <a href="#" className={cx('forgotPassword')}>
                        Forgot password?
                    </a>
                    <button type="submit">{cx('Login')}</button>
                </form>

                {/* Chuyển hướng người dùng sang trang đăng ký nếu chưa có tài khoản */}
                <p>
                    Not a member?{' '}
                    <Button Users to={routesconfig.signup}>
                        Đăng ký
                    </Button>
                </p>
            </div>
        </div>
    );
}

export default Login;
