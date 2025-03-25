import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BillList from './BillList';
import BillDetail from './BillDetail';

function Bill() {
    return (
        <div>
            <h2>Quản lý hóa đơn</h2>
            <Routes>
                <Route path="/" element={<BillList />} />
                <Route path=":id" element={<BillDetail />} />
            </Routes>
        </div>
    );
}

export default Bill;
