import React from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import MainPage from "./pages/User/MainPage/mainPage.jsx"
import HistPage from "./pages/User/HistPage/HistPage.jsx";
import HomePage from "./pages/MainPage/mainPage.jsx";
import PrintPage from "./pages/User/PrintPage/PrintPage.jsx";
import Profile from "./pages/User/ProfilePage/ProfilePage.jsx";
const App = () =>{
    return(
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/mainPage" element={<MainPage/>}/>
                    <Route path="/print-page" element={<PrintPage/>}/>
                    <Route path="/hist-page" element={<HistPage />}/>
                    <Route path="/profile-page" element={<Profile/>}/>
                </Routes>
            </div>
        </BrowserRouter>

    )
}
export default App