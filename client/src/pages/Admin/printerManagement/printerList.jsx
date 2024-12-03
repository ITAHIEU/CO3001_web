import React, { useState } from 'react';
import styles from "./printerList.module.css";
import Header from '../../../components/headerAdmin/header';
import { ReactComponent as ConfigIcon } from '../../../assets/list.svg';
import { ReactComponent as ListIcon } from '../../../assets/configuration.svg';
import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';

const MainPage = () => {
    const initialData = [
        { id: '001', brand: 'HP', model: 'Pixma', location: 'Campus A - Room P102', status: 'Active' },
    ];

    const [printers, setPrinters] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPrinter, setEditingPrinter] = useState(null);
    const [newPrinter, setNewPrinter] = useState({ id: '', brand: '', model: '', location: '', status: '' });

    const handleAddPrinter = () => {
        setPrinters([...printers, newPrinter]);
        setNewPrinter({ id: '', brand: '', model: '', location: '', status: '' });
    };

    const handleEditPrinter = (printer) => {
        setEditingPrinter(printer);
    };

    const handleSaveEdit = () => {
        setPrinters(printers.map(p => p.id === editingPrinter.id ? editingPrinter : p));
        setEditingPrinter(null);
    };

    const handleDeletePrinter = (id) => {
        setPrinters(printers.filter(p => p.id !== id));
    };

    const filteredPrinters = printers.filter(p => p.brand.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.printerBox}>
                    <h2 className={styles.printerManagementTitle}>Printer Management</h2>
                    <hr className={styles.underline} />
                    <ul className={styles.printerList}>
                        <button className={`${styles.button} ${styles.buttonList}`}>
                            <ListIcon className={styles.icon} />
                            Printer List
                        </button>
                        <button className={`${styles.button} ${styles.buttonSys}`}>
                            <ConfigIcon className={styles.icon} />
                            System Configuration
                        </button>
                    </ul>
                </div>
                <main className={styles.mainContent}>
                    <div className={styles.headerBar}>
                        <div className={styles.searchContainer}>
                            <SearchIcon className={styles.searchIcon} />
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className={styles.searchInput} 
                                value={searchTerm} 
                                onChange={e => setSearchTerm(e.target.value)} 
                            />
                        </div>
                        <div className={styles.printerBar}>
                            <h2>Printers List</h2>
                            <button 
                                className={styles.addPrinterBtn} 
                                onClick={handleAddPrinter}
                            >
                                Add Printer
                            </button>
                        </div>
                    </div>
                    {editingPrinter ? (
                        <div className={styles.editForm}>
                            <h2>Edit Printer</h2>
                            <input 
                                type="text" 
                                placeholder="ID" 
                                value={editingPrinter.id} 
                                onChange={e => setEditingPrinter({ ...editingPrinter, id: e.target.value })} 
                            />
                            <input 
                                type="text" 
                                placeholder="Brand" 
                                value={editingPrinter.brand} 
                                onChange={e => setEditingPrinter({ ...editingPrinter, brand: e.target.value })} 
                            />
                            <input 
                                type="text" 
                                placeholder="Model" 
                                value={editingPrinter.model} 
                                onChange={e => setEditingPrinter({ ...editingPrinter, model: e.target.value })} 
                            />
                            <input 
                                type="text" 
                                placeholder="Location" 
                                value={editingPrinter.location} 
                                onChange={e => setEditingPrinter({ ...editingPrinter, location: e.target.value })} 
                            />
                            <input 
                                type="text" 
                                placeholder="Status" 
                                value={editingPrinter.status} 
                                onChange={e => setEditingPrinter({ ...editingPrinter, status: e.target.value })} 
                            />
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={() => setEditingPrinter(null)}>Cancel</button>
                        </div>
                    ) : (
                        <table className={styles.printerTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPrinters.map((printer, index) => (
                                    <tr key={index}>
                                        <td>{printer.id}</td>
                                        <td>{printer.brand}</td>
                                        <td>{printer.model}</td>
                                        <td>{printer.location}</td>
                                        <td>{printer.status}</td>
                                        <td className={styles.actions}>
                                            <button 
                                                className={styles.editBtn}
                                                onClick={() => handleEditPrinter(printer)}
                                            >
                                                <EditIcon className={styles.actionIcon} />
                                                Edit
                                            </button>
                                            <button 
                                                className={styles.deleteBtn}
                                                onClick={() => handleDeletePrinter(printer.id)}
                                            >
                                                <DeleteIcon className={styles.actionIcon} />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </main>
            </div>
        </>
    );
};

export default MainPage;
