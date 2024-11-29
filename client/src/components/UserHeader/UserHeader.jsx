import React, {useEffect, useState}  from "react";
import styles from "./UserHeader.module.css"
import logo from "../../assets/hcmut.png"
import { Link } from "react-router-dom";
const UserHeader = ({onToggleDropdown, activeIndex}) =>{
    const [username, setUsername] = useState(null);
    // const [activeIndex, setActiveIndex] = useState(null);
    console.log(activeIndex);
    useEffect(() =>{
        fetch('/user.json')
            .then((response) => response.json())
            .then((data) => {
                if(data.length > 0 && data){
                    setUsername(data[0].username);
                }
            })
            .catch((error) => console.error("Error fetching username", error));
    },[]);
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo}></img>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {[
                        { label: "Trang chủ", path: "/mainPage" },
                        { label: "In tài liệu", path: "/print-page" },
                        { label: "Lịch sử in", path: "/hist-page" },
                        // { label: "Thông tin", path: "/profile-page" }
                    ].map((item, index) => (
                        <li
                            key={index}
                            className={`${styles.leftItem} ${activeIndex === index ? styles.active : ""}`}
                        >
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
                <ul className={styles.navList}>
                    <li className={styles.rightItem}>
                        <a href="#"><span class="material-symbols-outlined">language</span> Tiếng việt (vi) <span class="material-symbols-outlined">keyboard_arrow_down</span></a>
                    </li>
                    <li className={`${styles.rightItem} ${styles.login}`}>
                        <span class="material-symbols-outlined">account_circle</span>
                        <a href="#" onClick={onToggleDropdown}>
                            {username ? `${username}` : "Username"}
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
export default UserHeader;