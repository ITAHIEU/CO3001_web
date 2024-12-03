import React from "react";
import styles from "./MainPageAdmin.module.css";
import Header from "../../../components/headerAdmin/header";
import Footer from "../../../components/footerAdmin/footer";
import background from "../../../assets/mp7.png";

const MainPage = () => {
    return (
        <div className={styles.container}>
            <img src={background} alt="Background" className={styles.background_img} />
            <Header/>
            <div className={styles.contents}>
                Chào mừng<br/> đến với<br/> HCMUT_SPSS
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;
