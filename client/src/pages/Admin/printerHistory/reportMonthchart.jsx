import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from "./reportMonthchart.module.css";
import Header from '../../../components/headerAdmin/header';
import { ReactComponent as BackIcon } from '../../../assets/arrow-left.svg'; // Biểu tượng mũi tên quay lại

const ReportChart = () => {
    const initialData = [
        { month: "January", documents: 100, pages: 1000, cost: 210 },
        { month: "February", documents: 120, pages: 1200, cost: 250 },
        { month: "March", documents: 130, pages: 1300, cost: 270 },
        { month: "April", documents: 110, pages: 1100, cost: 230 },
        { month: "May", documents: 150, pages: 1500, cost: 300 },
        { month: "June", documents: 140, pages: 1400, cost: 280 },
        { month: "July", documents: 160, pages: 1600, cost: 320 },
        { month: "August", documents: 170, pages: 1700, cost: 340 },
        { month: "September", documents: 180, pages: 1800, cost: 360 },
        { month: "October", documents: 190, pages: 1900, cost: 380 },
        { month: "November", documents: 200, pages: 2000, cost: 400 },
        { month: "December", documents: 210, pages: 2100, cost: 420 }
    ];
    const [data] = useState(initialData);

    const handleBack = () => {
        window.location.href = "/report";
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.chartBox}>
                    <h2 className={styles.chartTitle}>Monthly Report Chart</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="documents" stroke="#8884d8" name="Documents" />
                            <Line type="monotone" dataKey="pages" stroke="#82ca9d" name="Pages" />
                            <Line type="monotone" dataKey="cost" stroke="#ffc658" name="Cost (nghìn đồng)" />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className={styles.note}>
                        <strong>Ghi chú:</strong> Tiền được tính bằng đơn vị <em>nghìn đồng</em>.
                    </p>
                    <button onClick={handleBack} className={styles.backBtn}>
                        <BackIcon className={styles.actionIcon} />
                        Back to Table
                    </button>
                </div>
            </div>
        </>
    );
};

export default ReportChart;
