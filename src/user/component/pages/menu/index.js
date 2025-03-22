import Menuitem from './menuitem/menuitem';
import classNames from 'classnames/bind';
import styles from './menu.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Menu() {
    const [menuItem, setMenuitem] = useState([]);
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:5000/menu/');
                setMenuitem(Object.values(res.data));
            } catch (error) {
                console.log(error.response?.data?.message || 'lỗi lấy menu');
            }
        };
        fetchMenu();
    }, []);
    console.log(menuItem);
    return (
        <div className={cx('menu')}>
            <Menuitem menuitem={menuItem} />
        </div>
    );
}
export default Menu;
