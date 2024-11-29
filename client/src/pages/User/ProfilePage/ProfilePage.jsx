import React, { useState , useEffect } from "react";
import styles from "./ProfilePage.module.css"
import UserHeader from "../../../components/UserHeader/UserHeader";
import Footer from "../../../components/FooterBar/Footer";
import { Link } from "react-router-dom"
const Profile = () => {
    const [user, setUsername] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () =>{
        setDropdownVisible(true);
    };
    const clickOutside = () => {
        if(isDropdownVisible) setDropdownVisible(false);
    }
    useEffect(() => {
        fetch("/user.json")
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              setUsername(data[0]);
            //   setOrder(data[0].order || []);
            }
          })
          .catch((error) => console.error("Error fetching username", error));
      }, []);
    return (
        <div className={styles.container} onClick={clickOutside}>
            <UserHeader activeIndex={3} onToggleDropdown={toggleDropdown}/>
            {isDropdownVisible && <div className={styles.dropdown_container}>
                <ul className={styles.dropdown_contents}>
                    <Link to="/profile-page" className={styles.link}><li>Hồ sơ</li></Link>
                    <li>Nạp tiền </li>
                    <Link to="/" className={styles.link}><li>Đăng xuất</li></Link>
                </ul>
            </div>}
            <div className={styles.infoContainer}>
                <div className={styles.info}>
                    <span className="material-symbols-outlined">account_circle</span>
                    <ul>
                        <li className={styles.text}>{user ? user.username : "Username"}</li>
                        <li className={styles.text}>#111111</li>
                    </ul>
                </div>
                <div className={styles.profile}>
                    <div className={styles.head}><h1>Thông tin</h1></div>
                    <div className={styles.content}>
                        {user && (
                            <div key={user.id} className={styles.userInfo}>
                                <div className={styles.row}>
                                    <span className={styles.label}>Tên người dùng:</span>
                                    <span className={styles.value}>{user.username}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Giới tính:</span>
                                    <span className={styles.value}>{user.sex}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Ngày sinh:</span>
                                    <span className={styles.value}>{user.birth}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Chức vụ:</span>
                                    <span className={styles.value}>{user.position}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Khoa:</span>
                                    <span className={styles.value}>{user.falcuty}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Email:</span>
                                    <span className={styles.value}>{user.mail}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Số điện thoại:</span>
                                    <span className={styles.value}>{user.phone}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.foot}>
                        <h1>Tài khoản</h1>
                        {user && (
                            <div className={styles.amount}>
                                <div className={styles.detail}>
                                    <span>Số dư:</span>
                                    <span><b>{user.money}</b></span>
                                </div>
                                <button>Nạp tiền</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Profile