import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route , Link } from "react-router-dom";
import Header from "./components/HeaderBar/Header.jsx";
import UserHeader from "./components/UserHeader/UserHeader.jsx";
import Footer from "./components/FooterBar/Footer.jsx";
import MainPage from "./pages/User/MainPage/mainPage.jsx";
import HistPage from "./pages/User/HistPage/HistPage.jsx";
import HomePage from "./pages/MainPage/mainPage.jsx";
import PrintPage from "./pages/User/PrintPage/PrintPage.jsx";
import Profile from "./pages/User/ProfilePage/ProfilePage.jsx";
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
                    <Link to="/profile-page" className={styles.link} onClick={clickOutside}><li>Hồ sơ</li></Link>                    <li>Nạp tiền </li>
                    <Link to="/" className={styles.link} onClick={clickOutside}><li>Đăng xuất</li></Link>
                </ul>
            </div>}
            <Routes>
            <Route 
                path="/" 
                element={
                <>
                    <Header />
                    <HomePage />
                </>
                } 
            />
            <Route 
                path="/mainPage" 
                element={
                <>
                    <UserHeader onToggleDropdown={toggleDropdown} activeIndex={0}/>
                    <MainPage clickOutside={clickOutside}/>
                </>
                } 
            />
            <Route 
                path="/print-page" 
                element={
                <>
                    <UserHeader onToggleDropdown={toggleDropdown} activeIndex={1}/>
                    <PrintPage clickOutside={clickOutside}/>
                </>
                } 
            />
            <Route 
                path="/hist-page" 
                element={
                <>
                    <UserHeader onToggleDropdown={toggleDropdown} activeIndex={2}/>
                    <HistPage clickOutside={clickOutside}/>
                </>
                } 
            />
            <Route 
                path="/profile-page" 
                element={
                <>
                    <UserHeader onToggleDropdown={toggleDropdown}/>
                    <Profile clickOutside={clickOutside}/>
                </>
                } 
            />
            </Routes>
            <Footer />
        </div>
        </BrowserRouter>
    );
}

export default App;
