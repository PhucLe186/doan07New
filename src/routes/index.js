import home from '~/user/component/pages/Homeee/home';
import menu from '~/user/component/pages/menu';
import table from '~/user/component/pages/table';
import login from '~/user/component/pages/login';
import Signup from '~/user/component/pages/signup/signup';
import fogot from '~/user/component/pages/forgot';
import contact from '~/user/component/pages/contact';
import Booking from '~/addmin/component/page/booking/booking';
import List from '~/addmin/component/page/menu';
import Booktable from '~/addmin/component/page/mnbook';
import member from '~/addmin/component/page/member';
import Cart from '~/user/component/pages/cart';
import routesconfig from '~/config/routes';
import Defaultlayout from '~/addmin/component/defaulayout';

const publicRoutes = [
    { path: routesconfig.home, component: home },
    { path: routesconfig.menu, component: menu },
    { path: routesconfig.table, component: table },
    { path: routesconfig.fogot, component: fogot, layout: null },
    { path: routesconfig.contact, component: contact },
    { path: routesconfig.cart, component: Cart },
    { path: routesconfig.login, component: login, layout: null },
    { path: routesconfig.signup, component: Signup, layout: null },
    { path: routesconfig.list, component: List, layout: Defaultlayout },
    { path: routesconfig.member, component: member, layout: Defaultlayout },
    { path: routesconfig.booktable, component: Booktable, layout: Defaultlayout },
    { path: routesconfig.booking, component: Booking, layout: Defaultlayout },
];
export { publicRoutes };
