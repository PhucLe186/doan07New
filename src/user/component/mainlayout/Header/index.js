import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import MenuItem from './menu/MenuList';
import Menu from './menu/Menu';
import routesConfig from '~/config/routes';
import classNames from 'classnames/bind';
import Button from '~/component/Button';
import Onback from '~/component/BackButton';
import { faBars, faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Props from './props';
import { useContext, useState } from 'react';
import { AuthContext } from '~/AuthContext';
import Tippy from '@tippyjs/react';
import Wrapper from '~/component/wrapper';

import 'tippy.js/dist/tippy.css';
const cx = classNames.bind(styles);

function Header() {
    const { user, loading, logout } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);

    if (loading) {
        return null;
    }

    const NAV_BAR = [
        { title: 'trang chủ', to: routesConfig.home },
        { title: 'thực đơn', to: routesConfig.menu },
        { title: 'đặt bàn', to: routesConfig.table },
        { title: 'giới thiệu', to: routesConfig.introduce },
        { title: 'liên hệ', to: routesConfig.contact },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Menu>
                    <Onback />
                    <MenuItem to={routesConfig.home} title="Trang chủ" />
                    <MenuItem to={routesConfig.menu} title="thực đơn" />
                    <MenuItem to={routesConfig.table} title="đặt bàn" />
                    <MenuItem to={routesConfig.introduce} title="giới thiệu" />
                    <MenuItem to={routesConfig.contact} title="Liên hệ" />
                    <Button main to={routesConfig.cart}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Button>
                    {user ? (
                        <Tippy
                            interactive
                            trigger="mouseenter focus"
                            hideOnClick={true}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Wrapper>
                                        <Button
                                            to={routesConfig.login}
                                            onClick={() => {
                                                logout();
                                            }}
                                        >
                                            logout
                                        </Button>
                                    </Wrapper>
                                </div>
                            )}
                        >
                            <button className={cx('user-icon')}>
                                <FontAwesomeIcon icon={faCircleUser} />
                            </button>
                        </Tippy>
                    ) : (
                        <Button primary to={routesConfig.login}>
                            đăng nhập
                        </Button>
                    )}
                    <Props menu={NAV_BAR}>
                        <button className={cx('menu-icon')}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </Props>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
