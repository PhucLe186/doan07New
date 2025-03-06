import Wrapper from '../../../../../component/wrapper';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './props.module.scss';
import List from './List';

const cx = classNames.bind(styles);
function Props({ children, menu }) {
    return (
        <Tippy
            interactive
            rigger="click"
            render={(attrs) => (
                <div className={cx('menu')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        {menu.map((item) => {
                            return <List data={item} />;
                        })}
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Props;
