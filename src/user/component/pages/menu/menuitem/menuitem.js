import { useState } from 'react';
import Pagination from './Pagination';
import classNames from 'classnames/bind';
import styles from './menulist.module.scss';
const cx = classNames.bind(styles);

function Menuitem({ menuitem }) {
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState('');

    const data = menuitem
        .filter((item) => category === 'all' || category === item.categoryName)
        .filter((item) => item.courseName.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('child1')}>
                <input className={cx('search')} value={search} onChange={(e) => setSearch(e.target.value)} />

                <button className={cx('filter1')} onClick={() => setCategory('all')}>
                    tất cả
                </button>
                <button className={cx('filter2')} onClick={() => setCategory('Monchinh')}>
                    món chính
                </button>
                <button className={cx('filter3')} onClick={() => setCategory('Montrangmieng')}>
                    tráng miệng
                </button>
            </div>
            <div className={cx('child2')}>
                <h2>Thực đơn</h2>
                {data.length > 1 ? (
                    <Pagination newsList={data} />
                ) : (
                    <div className={cx('text')}> không tìm thấy món ăn</div>
                )}
            </div>
        </div>
    );
}

export default Menuitem;
