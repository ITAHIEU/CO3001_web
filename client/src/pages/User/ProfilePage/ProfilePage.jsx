import React, { useState , useEffect } from "react";
import styles from "./ProfilePage.module.css"
import UserHeader from "../../../components/UserHeader/UserHeader";
import Footer from "../../../components/FooterBar/Footer";
import { Link } from "react-router-dom"
const Profile = () => {
    const [user, setUsername] = useState(null);
    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () =>{
        setDropdownVisible(true);
    };
    const clickOutside = () => {
        if(isDropdownVisible) setDropdownVisible(false);
    }
    useEffect(() => {
        // fetch("/user.json")
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (data.length > 0) {
        //       setUsername(data[0]);
        //     //   setOrder(data[0].order || []);
        //     }   
        //   })
        //   .catch((error) => console.error("Error fetching username", error));

          const data=localStorage.getItem("user");
          if(data) {
              setUsername(JSON.parse(data));
          }
      }, []);
    return (
        <div className={styles.container} onClick={clickOutside}>
            <div className={styles.infoContainer}>
                <div className={styles.info}>
                    <span className="material-symbols-outlined">account_circle</span>
                    <ul>
                        <li className={styles.text}>{user ? user.name : "Username"}</li>
                        <li className={styles.text}>{user && user.id}</li>
                    </ul>
                </div>
                <div className={styles.profile}>
                    <div className={styles.head}><h1>Thông tin</h1></div>
                    <div className={styles.content}>
                        {user && (
                            <div key={user.id} className={styles.userInfo}>
                                <div className={styles.row}>
                                    <span className={styles.label}>Tên người dùng:</span>
                                    <span className={styles.value}>{user.name}</span>
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
                                    <span className={styles.value}>{user.email}</span>
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
                                <a onClick={() => setShowSuccessCard(true)} style={{cursor: "pointer"}}><b>Lịch sử giao dịch</b></a>
                            </div>
                        )}
                    </div>
                    <div className={`${styles.overlay} ${showSuccessCard ? styles.show : ''}`} onClick={() => setShowSuccessCard(false)}></div>
                    <div className={`${styles.success_card} ${showSuccessCard ? styles.show : ''}`}>
                        <div className={styles.popCard}>
                            <div className={styles.title} ><h2>Lịch sử giao dịch</h2></div>
                            <div className={styles.content_box}>
                                <table className={styles.orderTable}>
                                <thead>
                                    <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Phương thức</th>
                                    <th>Số tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user && (user.order ? ( 
                                    user.recharge.map((user) => (
                                        <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.date}</td>
                                        <td>{user.method}</td>
                                        <td>{user.action}</td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="6" className={styles.noOrders}>
                                        Không có đơn hàng nào
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            <button onClick={() => {setShowSuccessCard(false); window.location.reload();}}>Close</button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile