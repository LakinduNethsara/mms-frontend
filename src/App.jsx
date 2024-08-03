import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import FooterComponent from './components/common/Footer';
import SAProfile from './components/Users/System_Analyst/SAProfile';
import CCProfile from './components/Users/CC/CCProfile';
import AdminProfile from './components/Users/Admin/AdminProfile';
import ARProfile from './components/Users/AR/ARProfile';
import DeanProfile from './components/Users/Dean/DeanProfile';
import HODProfile from './components/Users/HOD/HODProfile';
import VCProfile from './components/Users/VC/VCProfile';
import StudentProfile from './components/Users/Students/StudentProfile';
import LecturerProfile from './components/Users/Lecturer/LecturerProfile';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            
            {/* user landing pages routes begin */}
            <Route exact path="/system_analyst_profile" element={<SAProfile />} />
            <Route exact path="/cc_profile" element={<CCProfile />} />
            <Route exact path="/admin_profile" element={<AdminProfile />} />
            <Route exact path="/dean_profile" element={<DeanProfile />} />
            <Route exact path="/hod_profile" element={<HODProfile/>} />
            <Route exact path="/ar_profile" element={<ARProfile />} />
            <Route exact path="/vc_profile" element={<VCProfile />} />
            <Route exact path="/st_profile" element={<StudentProfile />} />
            <Route exact path="/lec_profile" element={<LecturerProfile />} />
            {/* user landing pages routes end */}

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  )
}

export default App
