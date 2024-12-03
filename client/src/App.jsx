import React from "react";
import { BrowserRouter,Routes, Route} from "react-router-dom";
//import MainPageAdmin from "./pages/Admin/homepageadmin/MainPageAdmin.jsx"
//import HomePage from './pages/login/Homepage'; // Trang chính
//import LogoutAdmin from './pages/Admin/homepageadmin/LogoutAdmin';
//import Mainprinter from './pages/Admin/printerManagement/mainPrinter';
//import Listprinter from './pages/Admin/printerManagement/printerList';
//import Configprinter from './pages/Admin/printerManagement/printerConfig';
// import MainPrinterhistory from './pages/Admin/printerHistory/mainPrinterhistory';
// import Printtablehistory from './pages/Admin/printerHistory/printTable';
// import Reportmonth from './pages/Admin/printerHistory/reportMonth';
import Reportmonthchart from './pages/Admin/printerHistory/reportMonthchart';

const App = () =>{
    return(
        <BrowserRouter>
            <div>
                <Routes>
                    {/* <Route path="/" element={<HomePage/>}/> */}

 
                    {/* <Route path="/" element={<MainPageAdmin/>}/> */}
                    {/* <Route path="/" element={<LogoutAdmin/>}/> */}


                    {/* <Route path="/" element={<Mainprinter/>}/> */}
                    {/* <Route path="/" element={<Listprinter/>}/>  */}
                    {/* <Route path="/" element={<Configprinter/>}/>  */}


                    {/* <Route path="/" element={<MainPrinterhistory/>}/>  */}
                    {/* <Route path="/" element={<Printtablehistory/>}/>  */}
                    {/* <Route path="/" element={<Reportmonth/>}/>  */}
                    <Route path="/" element={<Reportmonthchart/>}/> 

                </Routes>
            </div>
        </BrowserRouter>

    )
}
export default App