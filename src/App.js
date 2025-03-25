import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes";
import Default from "~/user/component/default";
import { AuthProvider } from "./AuthContext";

// Import trang hóa đơn
import BillList from "~/addmin/component/page/bill/BillList";
import BillDetail from "~/addmin/component/page/bill/BillDetail";
import BillForm from "~/addmin/component/page/bill/BillForm";
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {publicRoutes.map((route, idx) => {
                        let Layout = Default;
                        const Page = route.component;

                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        }

                        return (
                            <Route
                                key={idx}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Thêm routes cho hóa đơn */}
                    <Route path="/bills" element={<BillList />} />
                    <Route path="/bills/:id" element={<BillDetail />} />
                    <Route path="/bills/edit/:id" element={<BillForm />} />

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
