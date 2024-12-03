import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from "./reportMonth.module.css";
import Header from '../../../components/headerAdmin/header';
import { ReactComponent as ReportIcon } from '../../../assets/report.svg';
import { ReactComponent as ListIcon } from '../../../assets/configuration.svg';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';

const ReportMonth = () => {
    const initialData = [
        { month: "January", documents: 100, pages: 1000, cost: 210000 },
        { month: "February", documents: 120, pages: 1200, cost: 250000 },
        // Thêm dữ liệu mẫu khác
    ];

    const [data] = useState(initialData);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.printerBox}>
                    <h2 className={styles.printerManagementTitle}>Print Reports</h2>
                    <hr className={styles.underline}/>
                    <ul className={styles.printerList}>
                        <button className={`${styles.button} ${styles.buttonPrint}`}>
                            <ListIcon className={styles.icon} />
                            Print History Table
                        </button>
                        <button className={`${styles.button} ${styles.buttonReport}`}>  
                            <ReportIcon className={styles.icon} />
                            Report Section
                        </button>
                    </ul>
                </div>
                <main className={styles.mainContent}>
                    <h2>Monthly Report</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="documents" fill="#8884d8" />
                            <Bar dataKey="pages" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                    <button onClick={handlePrint} className={styles.printBtn}>
                        <PrintIcon className={styles.actionIcon} />
                        Print
                    </button>
                </main>
            </div>
        </>
    );
};

export default ReportMonth;
