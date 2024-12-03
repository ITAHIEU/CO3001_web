import React from "react";
import styles from "./headerLogout.module.css";
import logo from "../../assets/hcmut.png";
import { Link } from "react-router-dom";
import icon from '../../assets/icon.svg';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo}></img>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.leftItem}><a href="#">Home</a></li>
                    <li className={styles.leftItem}><a href="#">Printer Management</a></li>
                    <li className={styles.leftItem}><a href="#">User Management</a></li>
                    <li className={styles.leftItem}><a href="#">Print History</a></li>
                </ul>
                <ul className={styles.navList}>
                    <li className={styles.rightItem}>
                        <a href="#"><span className="material-symbols-outlined">language</span> Tiếng việt (vi) <span className="material-symbols-outlined">keyboard_arrow_down</span></a>
                    </li>
                    <li className={`${styles.rightItem} ${styles.login}`}>
                        <Link to="/mainPage">
                            <img src={icon} className={styles.AdminIcon} />
                            AdminName
                        </Link>
                        <div className={styles.logoutButtonContainer}> 
                            <button className={styles.logoutButton}> 
                                Logout 
                            </button> 
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
