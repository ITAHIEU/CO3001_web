import React, { useState} from "react";
import { BrowserRouter, Routes, Route , Link } from "react-router-dom";
import Header from "./components/HeaderBar/Header.jsx";
import UserHeader from "./components/UserHeader/UserHeader.jsx";
import Footer from "./components/FooterBar/Footer.jsx";
import MainPage from "./pages/User/MainPage/mainPage.jsx";
import HistPage from "./pages/User/HistPage/HistPage.jsx";
import HomePage from "./pages/MainPage/mainPage.jsx";
import PrintPage from "./pages/User/PrintPage/PrintPage.jsx";
import Profile from "./pages/User/ProfilePage/ProfilePage.jsx";
import AdHeader from "./components/AdHeader/AdHeader.jsx";
import AdMainPage from "./pages/Admin/MainPage/mainPage.jsx";
import UserManagement from "./pages/Admin/UserManagement/UserManagement.jsx";
import HistManagement from "./pages/Admin/HistoryManagement/HistoryManagement.jsx";
import PrinterManagement from "./pages/Admin/PrinterManagement/PrinterManagement.jsx";
import UserLoginHomePage from "./pages/User/login/Homepage.jsx";
import AdminLoginPage from "./pages/Admin/login/Loginpage.jsx";
import UserLoginPage from "./pages/User/login/Loginpage.jsx";
import styles from "./App.module.css"
const App = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () =>{
        setDropdownVisible(true);
    };
    const clickOutside = () => {
        if(isDropdownVisible) setDropdownVisible(false);
    }
    return (
        <BrowserRouter>
        <div onClick={clickOutside}>
            {isDropdownVisible && <div className={styles.dropdown_container}>
                <ul className={styles.dropdown_contents}>
                    <Link to="/profile-page" className={styles.link} onClick={clickOutside}><li>Hồ sơ</li></Link>                    
                    <li>Nạp tiền </li>
                    <Link to="/" className={styles.link} onClick={clickOutside}><li>Đăng xuất</li></Link>
                </ul>
            </div>}
            <Routes>
                <Route path="/" element={ <><Header /><HomePage /></> }/>
                <Route path="/home-login-page" element={<UserLoginHomePage/>}/>
                <Route path="/admin-login" element={<AdminLoginPage/>}/>
                <Route path="/user-login" element={<UserLoginPage/>}/>
                <Route path="/Ad-main-page" element={<> <AdHeader activeIndex={0}/> <AdMainPage/> </>}/>
                <Route path="printer-management" element={<> <AdHeader activeIndex={1}/> <PrinterManagement/></>}/>
                <Route path="/user-management" element={<> <AdHeader activeIndex={2}/> <UserManagement/> </>}/>
                <Route path="/hist-management" element={<> <AdHeader activeIndex={3}/> <HistManagement/></>}/>

                <Route path="/mainPage" element={<><UserHeader onToggleDropdown={toggleDropdown} activeIndex={0}/><MainPage clickOutside={clickOutside}/></>}/>
                <Route path="/print-page" element={<><UserHeader onToggleDropdown={toggleDropdown} activeIndex={1}/><PrintPage clickOutside={clickOutside}/></>}/>
                <Route path="/hist-page" element={<><UserHeader onToggleDropdown={toggleDropdown} activeIndex={2}/><HistPage clickOutside={clickOutside}/></>}/>
                <Route path="/profile-page" element={<><UserHeader onToggleDropdown={toggleDropdown}/><Profile clickOutside={clickOutside}/></>}/>
            </Routes>
            <Footer />
        </div>
        </BrowserRouter>
    );
}

export default App;
