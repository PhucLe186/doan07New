import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';

const auth = getAuth();
export const resetPassword = async (email, setError) => {
    setError('');
    try {
        const check = await fetchSignInMethodsForEmail(auth, email);
        if (check.length === 0) {
            setError('email khoong tồn tại ');
            return;
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
                })
                .catch((error) => {
                    console.error('Lỗi khi gửi email:', error);
                    alert('Gửi email thất bại. Vui lòng kiểm tra lại địa chỉ email.');
                });
        }
    } catch {
        return;
    }
};
