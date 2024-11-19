import React from "react";
import styles from "./mainPage.module.css"
import background from "../../assets/mp7.png"
import Header from "../../components/HeaderBar/Header";
import Footer from "../../components/FooterBar/Footer";
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