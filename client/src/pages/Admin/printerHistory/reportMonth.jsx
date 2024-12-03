import React, { useState } from 'react';
import styles from "./reportMonth.module.css";
import Header from '../../../components/headerAdmin/header';
import { ReactComponent as ReportIcon } from '../../../assets/report.svg';
import { ReactComponent as ListIcon } from '../../../assets/configuration.svg';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/arrow-right.svg'; // Biểu tượng mũi tên

const ReportMonth = () => {
    /*===========Phần này t ko bt thu thap du lieu kieu gi================ */
    const initialData = [
        { month: "January", documents: 100, pages: 1000, cost: 210000 / 1000 },
        { month: "February", documents: 120, pages: 1200, cost: 250000 / 1000 },
        { month: "March", documents: 130, pages: 1300, cost: 270000 / 1000 },
        { month: "April", documents: 110, pages: 1100, cost: 230000 / 1000 },
        { month: "May", documents: 150, pages: 1500, cost: 300000 / 1000 },
        { month: "June", documents: 140, pages: 1400, cost: 280000 / 1000 },
        { month: "July", documents: 160, pages: 1600, cost: 320000 / 1000 },
        { month: "August", documents: 170, pages: 1700, cost: 340000 / 1000 },
        { month: "September", documents: 180, pages: 1800, cost: 360000 / 1000 },
        { month: "October", documents: 190, pages: 1900, cost: 380000 / 1000 },
        { month: "November", documents: 200, pages: 2000, cost: 400000 / 1000 },
        { month: "December", documents: 210, pages: 2100, cost: 420000 / 1000 }
    ];

    const [data] = useState(initialData);

    const handlePrint = () => {
        window.print();
    };

    const goToChart = () => {
        // Chuyển hướng đến trang biểu đồ
        window.location.href = "/chart";
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
                    <h2 className={styles.monthlyReportTitle}>Monthly Report</h2>                    <table className={styles.reportTable}>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Total Documents</th>
                                <th>Total Pages</th>
                                <th>Total Cost (nghìn VND)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.month}</td>
                                    <td>{row.documents}</td>
                                    <td>{row.pages}</td>
                                    <td>{row.cost.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.buttonGroup}>
                        <button onClick={handlePrint} className={styles.printBtn}>
                            <PrintIcon className={styles.actionIcon} />
                            Print
                        </button>
                        <button onClick={goToChart} className={styles.chartBtn}>
                            <ArrowIcon className={styles.actionIcon} />
                            Go to Chart
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ReportMonth;
