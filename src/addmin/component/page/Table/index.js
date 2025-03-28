import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [tables, setTables] = useState([]);
    const [search, setSearch] = useState({ number: '', status: '' });
    const [newTable, setNewTable] = useState({ number: '', seats: '', status: 'available' });

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        const response = await fetch('http://localhost:5000/tables');
        const data = await response.json();
        setTables(data);
    };

    const addTable = async () => {
        const response = await fetch('http://localhost:5000/tables/addtable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTable),
        });
        const addedTable = await response.json();
        setTables([...tables, addedTable]);
        setNewTable({ number: '', seats: '', status: 'available' });
    };

    const editTable = async (id, updatedInfo) => {
        const response = await fetch(`http://localhost:5000/tables/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInfo),
        });
        const updatedTable = await response.json();
        setTables(tables.map((table) => (table.id === id ? updatedTable : table)));
    };

    const deleteTable = async (id) => {
        await fetch(`http://localhost:5000/tables/${id}/delete`, {
            method: 'DELETE',
        });
        setTables(tables.filter((table) => table.id !== id));
    };

    const updateStatus = async (id, status) => {
        const response = await fetch(`http://localhost:5000/tables/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        const updatedStatus = await response.json();
        setTables(tables.map((table) => (table.id === id ? { ...table, status: updatedStatus.status } : table)));
    };

    const searchTables = async () => {
        try {
            const query = new URLSearchParams();
            if (search.number) query.append('number', search.number);
            if (search.TinhTrangBan) query.append('TinhTrangBan', search.TinhTrangBan);

            const response = await axios.get(`http://localhost:5000/tables/search?${query.toString()}`);
            setTables(response.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    return (
        <div className="App">
            <h1>Quản Lý Bàn</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Số Bàn"
                    value={search.number}
                    onChange={(e) => setSearch({ ...search, number: e.target.value })}
                />
                <select
                    value={search.TinhTrangBan}
                    onChange={(e) => setSearch({ ...search, TinhTrangBan: e.target.value })}
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="0">Còn trống</option>
                    <option value="1">Đã đặt</option>
                    <option value="2">Đang phục vụ</option>
                </select>
                <button onClick={searchTables}>Tìm Kiếm</button>
            </div>
            <div className="table-layout">
                {tables.map((table, idx) => (
                    <div key={idx} className={`table ${table.TinhTrangBan}`}>
                        <h2>{table.TenBan}</h2>
                        <p>Số Ghế: {table.seats}</p>
                        <p>
                            Trạng Thái:{' '}
                            {table.TinhTrangBan === 0
                                ? 'trống'
                                : table.TinhTrangBan === 1
                                ? 'đã đặt trước'
                                : 'đang phục vụ'}
                        </p>
                        <button
                            onClick={() =>
                                updateStatus(table.id, table.status === 'available' ? 'occupied' : 'available')
                            }
                        >
                            {table.status === 'available' ? 'Đặt' : 'Giải Phóng'}
                        </button>
                        <button onClick={() => deleteTable(table.id)}>Xóa</button>
                    </div>
                ))}
            </div>
            <h2>Thêm Bàn Mới</h2>
            <input
                type="text"
                placeholder="Số Bàn"
                value={newTable.number}
                onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
            />
            <input
                type="text"
                placeholder="Số Ghế"
                value={newTable.seats}
                onChange={(e) => setNewTable({ ...newTable, seats: e.target.value })}
            />
            <button onClick={addTable}>Thêm Bàn</button>
        </div>
    );
}

export default App;
