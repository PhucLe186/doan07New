import Menuitem from './menuitem/menuitem';
import classNames from 'classnames/bind';
import styles from './menu.module.scss';

const cx = classNames.bind(styles);

function menu() {
    const menuItem = [
        {
            categoryName: 'Monchinh',
            courseName: 'Vịt Quay Bắc Kinh',
            metaDiscription:
                'Tuyệt phẩm gà quay da giòn rụm, thịt mềm thơm, ăn kèm bánh tráng, rau sống và nước sốt đặc biệt. Mang hương vị đặc trưng.',
            imageUrl: require('~/asset/img/vitquaybackinh.jpg'),
            status: 'còn',
        },
        {
            categoryName: 'Monchinh',
            courseName: 'Gà Cung Bảo',
            metaDiscription:
                'Món gà xào cay trứ danh Tứ Xuyên, với thịt gà mềm ngọt, ớt khô cay nồng, đậu phộng giòn bùi và sốt đậm đà. Một sự bùng nổ vị giác khó quên.',
            imageUrl: require('~/asset/img/gacungbao.jpg'),
            status: 'còn',
        },
        {
            categoryName: 'Monchinh',
            courseName: 'Thịt Kho Đông Pha',
            metaDiscription:
                'Món thịt ba chỉ kho kỳ công, mềm tan trong miệng, thấm đẫm gia vị đậm đà. Một tuyệt phẩm ẩm thực Hàng Châu, mang đến trải nghiệm ẩm thực tinh tế.',
            imageUrl: require('~/asset/img/thitkhodongpha.jpg'),
            status: 'còn',
        },
        {
            categoryName: 'Monchinh',
            courseName: 'Lẩu Tứ Xuyên',
            metaDiscription:
                'Nồi lẩu cay nồng, tê lưỡi đặc trưng Tứ Xuyên, với nước dùng đậm đà và đa dạng nguyên liệu nhúng kèm. Thích hợp cho những buổi tụ họp ấm cúng.',
            imageUrl: require('~/asset/img/laucaytuxuyen.jpg'),
            status: 'còn',
        },
        {
            categoryName: 'Monchinh',
            courseName: 'Sủi Cảo',
            metaDiscription:
                'Những chiếc bánh nhỏ xinh, vỏ mỏng dai, nhân thịt hoặc rau củ tươi ngon, hấp hoặc chiên vàng ruộm. Món ăn nhẹ hoàn hảo để khởi đầu bữa tiệc vị giác.',
            imageUrl: require('~/asset/img/suicao.jpg'),
            status: 'hết',
        },
        {
            categoryName: 'Monchinh',
            courseName: 'Mì Trường Thọ',
            metaDiscription:
                'Sợi mì dài dai, tượng trưng cho sự trường thọ, ăn kèm nước dùng đậm đà và các loại topping tươi ngon. Món ăn ý nghĩa dành cho những dịp đặc biệt.',
            imageUrl: require('~/asset/img/mitruongtho.jpg'),
            status: 'còn',
        },
        {
            categoryName: 'Monchinh',
            courseName: 'Mì Hoành Thánh',
            metaDiscription:
                'Mì sợi dai ngon, ăn kèm hoành thánh nhân thịt đậm đà, trong nước dùng thanh ngọt. Một món ăn quen thuộc, nhưng được chế biến với hương vị đặc biệt.',
            imageUrl: require('~/asset/img/mihoanhthanh.jpg'),
            status: 'còn',
        },

        {
            categoryName: 'Montrangmieng',
            courseName: 'Kẹo Hồ Lô',
            metaDiscription:
                'Món quà vặt tuổi thơ, mang đậm hương vị truyền thống. Kẹo hồ lô chua ngọt là lựa chọn lý tưởng cho những ai muốn tìm lại ký ức xưa.',
            imageUrl: require('~/asset/img/keoholo.jpg'),
            status: 'hết',
        },

        {
            categoryName: 'Montrangmieng',
            courseName: 'Màn Thầu Chiên',
            metaDiscription:
                'Bánh màn thầu trắng mịn, hấp chín tới, sau đó được chiên vàng giòn rụm. Chấm cùng sữa đặc ngọt ngào, tạo nên sự kết hợp hương vị độc đáo.',
            imageUrl: require('~/asset/img/manthauchien.jpg'),
            status: 'còn',
        },

        {
            categoryName: 'Montrangmieng',
            courseName: 'Bánh Trôi Tàu',
            metaDiscription:
                'Bánh trôi nước nóng hổi, nhân vừng đen hoặc đậu phộng thơm bùi, nước gừng ấm nồng. Món tráng miệng ấm lòng,thích hợp trong những ngày se lạnh.',
            imageUrl: require('~/asset/img/banhtroitau.jpg'),
            status: 'còn',
        },

        {
            categoryName: 'Montrangmieng',
            courseName: 'Bánh Rán Vừng',
            metaDiscription:
                'Bánh bột nếp chiên vàng ươm, phủ lớp vừng thơm lừng, giòn tan trong miệng. Lựa chọn tuyệt vời cho những ai yêu thích hương vị truyền thống.',
            imageUrl: require('~/asset/img/banhranvung.jpg'),
            status: 'hêt',
        },
        {
            categoryName: 'Montrangmieng',
            courseName: 'Bánh Chiên Xoắn',
            metaDiscription:
                'Loại bánh chiên dân dã, với hình dáng và hương vị đặc trưng. Bánh chiên xoắn giòn rụm thích hợp để nhâm nhi cùng trà nóng.',
            imageUrl: require('~/asset/img/banhchienxoan.jpg'),
            status: 'còn',
        },

        {
            categoryName: 'Montrangmieng',
            courseName: 'Bánh Đường Vòng',
            metaDiscription:
                'Loại bánh chiên dân dã, với hình dáng và hương vị đặc trưng. Bánh đường vòng ngọt ngào thích hợp để nhâm nhi cùng trà nóng.',
            imageUrl: require('~/asset/img/banhduongvong.jpg'),
            status: 'hết',
        },

        {
            categoryName: 'Montrangmieng',
            courseName: 'Kẹo Lạc',
            metaDiscription:
                'Món quà vặt tuổi thơ, mang đậm hương vị truyền thống. Kẹo lạc giòn bùi, là lựa chọn lý tưởng cho những ai muốn tìm lại ký ức xưa.',
            imageUrl: require('~/asset/img/keolac.jpg'),
            status: 'hết',
        },
    ];

    return (
        <div className={cx('menu')}>
            <Menuitem menuitem={menuItem} />
        </div>
    );
}

export default menu;
