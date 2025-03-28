import { useState } from 'react';

import Menu from './menu/Menu';
import Menulist from './menu/MenuItem';
import routesConfig from '~/config/routes';
import styles from './slidebar.module.scss';
import classNames from 'classnames/bind';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Sildebar() {
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (menuName) => {
        setActiveMenu((prev) => (prev === menuName ? null : menuName)); // Bật/tắt đúng menu
    };
    return (
        <div className={cx('menu')}>
            <h1 className={cx('logo')}>logo</h1>
            <Menu>
                <Menulist to={routesConfig.admin} title="thống kê"></Menulist>

                <Menulist
                    title="hóa đơn"
                    icon={activeMenu === 'hoadon' ? faChevronDown : faChevronRight}
                    onClick={() => toggleMenu('hoadon')}
                ></Menulist>

                {activeMenu === 'hoadon' && (
                    <ul className={cx('submenu')}>
                        <li>
                            <Menulist className top to={routesConfig.billist} title="quản lý hóa đơn"></Menulist>
                        </li>
                    </ul>
                )}
                <Menulist
                    title="đặt bàn"
                    icon={activeMenu === 'datban' ? faChevronDown : faChevronRight}
                    onClick={() => toggleMenu('datban')}
                ></Menulist>

                {activeMenu === 'datban' && (
                    <ul className={cx('submenu')}>
                        <li>
                            <Menulist className to={routesConfig.Table} title="sơ đồ bàn"></Menulist>
                            <Menulist className to={routesConfig.manage} title="quản lý đặt bàn"></Menulist>
                            <Menulist className to={routesConfig.history} title="lịch sử đặt bàn"></Menulist>
                        </li>
                    </ul>
                )}
                <Menulist to={routesConfig.member} title="khách hàng"></Menulist>
                <Menulist to={routesConfig.staff} title="nhân viên"></Menulist>
            </Menu>
        </div>
    );
}

export default Sildebar;
