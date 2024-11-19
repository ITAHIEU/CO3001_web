import React  from "react";
import styles from "./Header.module.css"
import logo from "../../assets/hcmut.png"

const Header = () =>{
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo}></img>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.leftItem}><a href="#">Trang chủ</a></li>
                    <li className={styles.leftItem}><a href="#">In tài liệu</a></li>
                </ul>
                <ul className={styles.navList}>
                    <li className={styles.rightItem}>
                        <a href="#"><span class="material-symbols-outlined">language</span> Tiếng việt (vi) <span class="material-symbols-outlined">keyboard_arrow_down</span></a>
                    </li>
                    <li className={`${styles.rightItem} ${styles.login}`}><a href="#">Đăng nhập</a></li>
                </ul>
            </nav>
        </header>
    );
};
export default Header;