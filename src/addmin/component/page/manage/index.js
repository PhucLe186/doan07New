import classNames from 'classnames/bind';
import styles from './contact.module.scss';

const cx = classNames.bind(styles);

function manage() {
    return <div className={cx('manage')}></div>;
}

export default manage;
