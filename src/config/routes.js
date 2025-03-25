import BillList from "~/addmin/component/page/bill/BillList";
import BillDetail from "~/addmin/component/page/bill/BillDetail";

const routes = {
    home: "/",
    menu: "/menu",
    order: "/order",
    forgot: "/forgot",
    manage: "/manage",
    login: "/login",
    signup: "/signup",
    member: "/member",
    table: "/table",
    staff: "/staff",
    booking: "/booking",
    cart: "/cart",
    reset: "/reset",
    admin: "/admin",
    history: "/history",
    bill: "/bills", 
};

export default routes;

export const publicRoutes = [
    { path: routes.bill, component: BillList },
    { path: "/bills/:id", component: BillDetail }
];
