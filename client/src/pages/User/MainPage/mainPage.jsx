import React, {useState} from "react";
import styles from "./mainPage.module.css"
import background from "../../../assets/mp7.png"
import { Link } from "react-router-dom";
const MainPage = ({clickOutside}) => {
    return (
        <div className={styles.container} onClick={clickOutside}>
            <img src={background} alt="Background" className={styles.background_img} />
            <div className={styles.contents}>
                Chào mừng<br/> đến với<br/> HCMUT_SPSS
            </div>
        </div>
    );
};
export default MainPage;