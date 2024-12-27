import React, { useEffect, useState, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/hcmut.png";
import { Link } from "react-router-dom";

const Header = () =>{
    const [showMenu, setShowMenu] = useState(false);
    const mobileMenuRef = useRef(null); 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setShowMenu(false); 
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const toggleMenu = () => setShowMenu((prev) => !prev);
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <button className={styles.menuButton} onClick={toggleMenu}>
                    <span className="material-symbols-outlined">menu</span>
                </button>
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
                    <li className={`${styles.rightItem} ${styles.login}`}><Link to="/home-login-page">Đăng nhập</Link></li>
                </ul>
            </nav>
            <div ref={mobileMenuRef} className={`${styles.mobileMenu} ${showMenu ? styles.show : ""}`}>
                {[{ label: "Trang chủ", path: "/" }, { label: "In tài liệu", path: "/home-login-page" }].map(
                    (item, index) => (
                        <Link key={index} to={item.path} onClick={toggleMenu}>
                            {item.label}
                        </Link>
                    )
                )}
            </div>
        </header>
    );
};
export default Header;