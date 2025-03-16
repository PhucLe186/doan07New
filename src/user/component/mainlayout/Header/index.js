import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import MenuItem from './menu/MenuList';
import Menu from './menu/Menu';
import routesConfig from '~/config/routes';
import classNames from 'classnames/bind';
import Button from '~/component/Button';
import Onback from '~/component/BackButton';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '~/AuthContext';

import Props from '~/component/props';

const cx = classNames.bind(styles);

function Header() {
    const { user } = useContext(AuthContext);

    const NAV_BAR = [
        { title: 'logout', to: routesConfig.login },
        { title: 'logout', to: routesConfig.login },
        { title: 'logout', to: routesConfig.login },
        { title: 'logout', to: routesConfig.login },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Menu>
                    <Onback />
                    <MenuItem to={routesConfig.home} title="Trang chủ" />
                    <MenuItem to={routesConfig.menu} title="thực đơn" />
                    <MenuItem to={routesConfig.table} title="đặt bàn" />
                    <MenuItem to={routesConfig.contact} title="Liên hệ" />
                    <Button main to={routesConfig.cart}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Button>
                    <div className={cx('user')}>
                        {user ? (
                            <Props menu={NAV_BAR}>
                                <button className={cx('user-icon')}>
                                    <FontAwesomeIcon icon={faCircleUser} />{' '}
                                </button>
                            </Props>
                        ) : (
                            <Button primary to={routesConfig.login}>
                                đăng nhập
                            </Button>
                        )}
                    </div>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
