import React, {useState} from "react";
import styles from "./mainPage.module.css"
import background from "../../../assets/mp7.png"
import UserHeader from "../../../components/UserHeader/UserHeader"
import Footer from "../../../components/FooterBar/Footer";
import { Link } from "react-router-dom";
const MainPage = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () =>{
        setDropdownVisible(true);
    };
    const clickOutside = () => {
        if(isDropdownVisible) setDropdownVisible(false);
    }
    return (
        <div className={styles.container} onClick={clickOutside}>
            <img src={background} alt="Background" className={styles.background_img} />
            <UserHeader onToggleDropdown={toggleDropdown} activeIndex={0}/>
            <div className={styles.contents}>
                Chào mừng<br/> đến với<br/> HCMUT_SPSS
            </div>
            {isDropdownVisible && <div className={styles.dropdown_container}>
                <ul className={styles.dropdown_contents}>
                    <Link to="/profile-page" className={styles.link}><li>Hồ sơ</li></Link>
                    <li>Nạp tiền </li>
                    <Link to="/" className={styles.link}><li>Đăng xuất</li></Link>
                </ul>
            </div>}
            <Footer/>
        </div>
    );
};
export default MainPage;