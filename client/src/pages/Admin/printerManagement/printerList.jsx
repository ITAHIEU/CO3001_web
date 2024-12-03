import React from 'react';
import styles from "./printerList.module.css";
import Header from '../../../components/headerAdmin/header';
import { ReactComponent as ConfigIcon} from '../../../assets/list.svg';
import { ReactComponent as ListIcon  } from '../../../assets/configuration.svg';
import { ReactComponent as SearchIcon } from '../../../assets/search.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';

const MainPage = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.printerBox}>
                    <h2 className={styles.printerManagementTitle}>Printer Management</h2>
                    <hr className={styles.underline}/>
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
                            <input type="text" placeholder="Search" className={styles.searchInput} />
                        </div>
                        <div className={styles.printerBar}>
                            <h2>Printers List</h2>
                            <button className={styles.addPrinterBtn}>Add Printer</button>
                        </div>
                    </div>
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
                            <tr>
                                <td>001</td>
                                <td>HP</td>
                                <td>Pixma</td>
                                <td>Campus A - Room P102</td>
                                <td>Active</td>
                                <td className={styles.actions}>
                                    <button className={styles.editBtn}>
                                        <EditIcon className={styles.actionIcon} />
                                        Edit
                                    </button>
                                    <button className={styles.deleteBtn}>
                                        <DeleteIcon className={styles.actionIcon} />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            {/* Thêm */}
                        </tbody>
                    </table>
                </main>
            </div>
        </>
    );
};

export default MainPage;
