import React, { useEffect, useState, useRef } from "react";
import styles from "./UserHeader.module.css";
import logo from "../../assets/hcmut.png";
import { Link } from "react-router-dom";

const UserHeader = ({ onToggleDropdown, activeIndex }) => {
    const [username, setUsername] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const mobileMenuRef = useRef(null); 

    useEffect(() => {
        fetch("/user.json")
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0 && data) {
                    setUsername(data[0].username);
                }
            })
            .catch((error) => console.error("Error fetching username", error));

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

    const toggleMenu = () => setShowMenu((prev) => !prev); // Toggle menu visibility

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
            <   button className={styles.menuButton} onClick={toggleMenu}>
                    <span className="material-symbols-outlined">menu</span> {/* Button to show menu */}
                </button>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {[{ label: "Trang chủ", path: "/mainPage" }, { label: "In tài liệu", path: "/print-page" }, { label: "Lịch sử in", path: "/hist-page" }].map(
                        (item, index) => (
                            <li
                                key={index}
                                className={`${styles.leftItem} ${activeIndex === index ? styles.active : ""}`}
                            >
                                <Link to={item.path}>{item.label}</Link>
                            </li>
                        )
                    )}
                </ul>
                <ul className={`${styles.navList} ${styles.rightList}`}>
                    <li className={styles.rightItem}>
                        <a href="#">
                            <span className="material-symbols-outlined">language</span> Tiếng việt (vi) <span className="material-symbols-outlined">keyboard_arrow_down</span>
                        </a>
                    </li>
                    <li className={`${styles.rightItem} ${styles.login}`}>
                        <span className="material-symbols-outlined">account_circle</span>
                        <a href="#" onClick={onToggleDropdown}>
                            {username ? `${username}` : "Username"}
                        </a>
                    </li>
                </ul>
            </nav>

            <div ref={mobileMenuRef} className={`${styles.mobileMenu} ${showMenu ? styles.show : ""}`}>
                {[{ label: "Trang chủ", path: "/mainPage" }, { label: "In tài liệu", path: "/print-page" }, { label: "Lịch sử in", path: "/hist-page" }].map(
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

export default UserHeader;
