import classNames from 'classnames/bind';
import styles from './contact.module.scss';

const cx = classNames.bind(styles);

function contact() {
    return <div className={cx('contact')}></div>;
}

export default contact;
