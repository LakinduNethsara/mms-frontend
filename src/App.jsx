import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import CourseCard from './components/common/CourseCard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            
            {/* User landing pages routes begin */}
            <Route exact path="/system_analyst_profile" component={SAProfile} />
            <Route exact path="/cc_profile" component={CCProfile} />
            <Route exact path="/admin_profile" component={AdminProfile} />
            <Route exact path="/dean_profile" component={DeanProfile} />
            <Route exact path="/hod_profile" component={HODProfile} />
            <Route exact path="/ar_profile" component={ARProfile} />
            <Route exact path="/vc_profile" component={VCProfile} />
            <Route exact path="/st_profile" component={StudentProfile} />
            <Route exact path="/lec_profile" component={LecturerProfile} />
            {/* User landing pages routes end */}

            {/* Marks Return Sheets Routes */}
            <Route exact path="/CourseCard/:level/:semester/:department" 
              render={(props) => <CourseCard {...props} approved_level={"lecturer"} />} 
            />

            {/* Catch-all route */}
            {/* <Route path="*" component={NotFoundPage} /> */}
          </Switch>
        </div>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
