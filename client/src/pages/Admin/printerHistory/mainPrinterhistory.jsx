import React from 'react';
import styles from "./mainPrinterhistory.module.css";
import printerImage from '../../../assets/printer2.png';
import Header from '../../../components/headerAdmin/header'; 

import { ReactComponent as ListIcon } from '../../../assets/list.svg'; 
import { ReactComponent as ReportIcon } from '../../../assets/report.svg';
const MainPage = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.printerBox}>
                    <h2 className={styles.printerManagementTitle}>Print History</h2>
                    <hr className={styles.underline}/>
                    <ul className={styles.printerList}>
                        <button className={styles.button}>
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
                <div className={styles.imageBox}>
                        <img src={printerImage} alt="Printer" className={styles.backgroundImage} />
                        <div className={styles.overlayText}>
                            <p>Chào mừng đến với lịch sử in ấn</p>
                            <p className={styles.smallText}>"Vui lòng chọn một trong các tùy chọn bên trái để bắt đầu quản lý máy in của bạn."</p>
                        </div>
                </div>  
                           
            </div>
            
        </>
    );
};

export default MainPage;
