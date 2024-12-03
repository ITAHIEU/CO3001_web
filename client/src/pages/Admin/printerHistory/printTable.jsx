import React, { useState } from 'react';
import styles from "./printTable.module.css";
import Header from '../../../components/headerAdmin/header';
import { ReactComponent as ReportIcon } from '../../../assets/report.svg';
import { ReactComponent as ListIcon } from '../../../assets/configuration.svg';
import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';

const MainPage = () => {
    const initialData = [
        { id: "22xxxxx", username: "abc", document: "Report1.pdf", date: "01/01/2024", pages: "10 A4", printer: "001", cost: 21000 },
        // Thêm dữ liệu mẫu khác
    ];

    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [editRowId, setEditRowId] = useState(null);
    const [editRowData, setEditRowData] = useState({});

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearAll = () => {
        setData([]);
    };

    const handleClearRow = (id) => {
        setData(data.filter((row) => row.id !== id));
    };

    const handlePrint = () => {
        const printContents = document.querySelector(`.${styles.mainContent}`).innerHTML; // Chọn nội dung cần in
        const originalContents = document.body.innerHTML; 

        document.body.innerHTML = `
            <div style="text-align: center;">
                <h2>Users List</h2>
                ${printContents}
            </div>
        `;

        window.print(); 

        document.body.innerHTML = originalContents; 
        window.location.reload(); 
    };


    const handleEdit = (row) => {
        setEditRowId(row.id);
        setEditRowData(row);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditRowData({
            ...editRowData,
            [name]: value,
        });
    };

    const handleSaveEdit = () => {
        setData(data.map((row) => (row.id === editRowId ? editRowData : row)));
        setEditRowId(null);
    };

    const filteredData = data.filter((row) =>
        row.username ? row.username.toLowerCase().includes(searchTerm.toLowerCase()) : false
    );

    return (
        <>
            <Header />
            <div className={styles.container}>
            <div className={styles.printerBox}>
                    <h2 className={styles.printerManagementTitle}>Print History</h2>
                    <hr className={styles.underline}/>
                    <ul className={styles.printerList}>
                        <button className={`${styles.button} ${styles.buttonPrint}`}>
                            {/* <li className={styles.listItem}> */}
                                <ListIcon className={styles.icon} />
                                    Print History Table
                            {/* </li> */}
                        </button>
                        <button className={styles.button}>  
                            {/* <li className={styles.listItem}> */}
                                <ReportIcon  className={styles.icon} />
                                    Report Section
                            {/* </li> */}
                        </button>
                    </ul>
                </div>
                <main className={styles.mainContent}>
                    <div className={styles.headerBar}>
                        <div className={styles.searchContainer}>
                            <SearchIcon className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search by username"
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className={styles.printerBar}>
                            <h2>Users List</h2>
                            <button onClick={handleClearAll} className={`${styles.btn} ${styles.deleteBtn}`}>
                                <DeleteIcon className={styles.actionIcon} />
                                Clear All
                            </button>
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={handlePrint} className={`${styles.btn} ${styles.printBtn}`}>
                            <PrintIcon className={styles.actionIcon} />
                            Print
                        </button>
                    </div>
                    <table className={styles.printerTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Document name</th>
                                <th>Print Date</th>
                                <th>Printer</th>
                                <th>Cost</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row) => (
                                <tr key={row.id}>
                                    {editRowId === row.id ? (
                                        <>
                                            <td><input type="text" name="id" value={editRowData.id} onChange={handleEditChange} /></td>
                                            <td><input type="text" name="username" value={editRowData.username} onChange={handleEditChange} /></td>
                                            <td><input type="text" name="document" value={editRowData.document} onChange={handleEditChange} /></td>
                                            <td><input type="text" name="date" value={editRowData.date} onChange={handleEditChange} /></td>
                                            <td><input type="text" name="printer" value={editRowData.printer} onChange={handleEditChange} /></td>
                                            <td><input type="number" name="cost" value={editRowData.cost} onChange={handleEditChange} /></td>
                                            <td>
                                                <button onClick={handleSaveEdit} className={styles.saveBtn}>Save</button>
                                                <button onClick={() => setEditRowId(null)} className={styles.cancelBtn}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{row.id}</td>
                                            <td>{row.username}</td>
                                            <td>{row.document}</td>
                                            <td>{row.date}</td>
                                            <td>{row.printer}</td>
                                            <td>{row.cost}</td>
                                            <td className={styles.actions}>
                                                <button onClick={() => handleEdit(row)} className={`${styles.btn} ${styles.editBtn}`}>
                                                    <EditIcon className={styles.actionIcon} />
                                                    Edit
                                                </button>
                                                <button onClick={() => handleClearRow(row.id)} className={`${styles.btn} ${styles.deleteBtn}`}>
                                                    <DeleteIcon className={styles.actionIcon} />
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </>
    );
};

export default MainPage;
