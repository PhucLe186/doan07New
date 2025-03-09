import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendEmailVerification } from 'firebase/auth';
import { auth, database } from '~/firebase';
import { ref, set } from 'firebase/database';
import routesconfig from '~/config/routes';

export const Authservice = async (name, phone, email, password, address, confirmPassword, setError, Navigate) => {
    setError('');

    if (password !== confirmPassword) {
        setError('nhập sai mật khẩu');
        return;
    }
    if (password.length < 6) {
        setError('mật khẩu phải từ 6 ký tự');
        return;
    }
    if (phone.length < 10 || phone.length > 10) {
        setError(' số điện thoại k đúng định dạng');
        return;
    }
    if (!name.match(/^([A-ZÀ-Ỹ][a-zà-ỹ]+)(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)+$/)) {
        setError('Tên không hợp lệ! Vui lòng nhập họ và tên, viết hoa chữ cái đầu.');
        return;
    }

    try {
        const checkmail = await fetchSignInMethodsForEmail(auth, email);
        if (checkmail.length > 1) {
            setError('rất tiết! tài khoản email này đã tồn tại');
            return;
        }

        const user = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(user.user);
        const uid = user.user.uid;

        await set(ref(database, `khachhang/${uid}`), {
            email: email,
            Tenkhachhang: name,
            soDienThoai: phone,
            DiaChi: address,
            Username: email.split('@')[0],
        });

        console.log('dang ky thanh cong');
        Navigate(routesconfig.login);
    } catch (error) {
        setError(error.massage);
    }
};
