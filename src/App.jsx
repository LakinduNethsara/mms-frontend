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

import HomePageAR from './pages/Users/AR/HomePage/HomePageAR';
import ViewMedicalPage from './pages/Users/AR/ViewMedicalTablePage/ViewMedicalPage';
import HomePageStudent from './pages/Users/Students/HomePageStudent/HomePageStudent';

import HODMarksReturnSheet from './components/common/HODMarksReturnSheet';
import MarksCheckingForm from './components/common/MarksCheckingForm';
import CertifyMarksheet from './components/common/CertifyMarksheet';
import DeanFinalMarkSheet from './components/common/DeanFinalMarkSheet';
import AddCAMarksByLec from './pages/Users/Lecturer/AddCAMarksByLec';
import LecRelatedCourses from './components/Users/Lecturer/LecRelatedCourses';
import CCDashBoard from './pages/Users/CC/CCDashBoard';
import ViewCAEligibile from './pages/Users/CC/ViewCAEligibile';
import CAEligibility from './pages/Users/CC/CAEligibility';
import CCMarksApproval from './pages/Users/CC/CCMarksApproval';


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



            {/* AR navigations starts here ---------------------------------------------*/}


              <Route exact path="/ar_profile" component={HomePageAR} />           {/* AR Home Page */}
              <Route exact path="/viewMedicals" component={ViewMedicalPage} />

            {/* AR navigations ends here ---------------------------------------------*/}



            <Route exact path="/vc_profile" component={VCProfile} />




            {/* Student navigations starts here ---------------------------------------------*/}

            <Route exact path="/st_profile" component={HomePageStudent} />

            {/* Student navigations ends here ---------------------------------------------*/}





            <Route exact path="/lec_profile" component={LecturerProfile} />
            {/* User landing pages routes end */}

            {/* Marks Return Sheets Routes */}
            <Route exact path="/CourseCard/:level/:semester/:department" 
              render={(props) => <CourseCard {...props} approved_level={"lecturer"} />} 
            />
            <Route exact path="/HODMarksReturnSheet/:course_id/:course_name/:department" 
              render={(props) => <HODMarksReturnSheet {...props}  approved_level={"lecturer"} />} 
            />
            <Route exact path="/ccMarksReturnSheet/:course_id/:course_name/:department" 
              render={(props) => <HODMarksReturnSheet {...props}  approved_level={"finalized"} />} 
            />
            <Route exact path="/lMarksReturnSheet/:course_id/:course_name/:department" 
              render={(props) => <HODMarksReturnSheet {...props}  approved_level={"course_coordinator"} />} 
            />

            <Route exact path="/deanFinalMarkSheet/:level/:semester/:dept" 
              render={(props) => <DeanFinalMarkSheet {...props}  approved_level={"AR"} />} 
            />
            <Route exact path="/vcFinalMarkSheet/:level/:semester/:dept" 
              render={(props) => <DeanFinalMarkSheet {...props}  approved_level={"Dean"} />} 
            />

            <Route exact path="/pendingDeanCertifyMarksheet" 
              render={(props) => <CertifyMarksheet {...props}  approved_level={"AR"}/>} 
            />
            <Route exact path="/pendingVCCertifyMarksheet" 
              render={(props) => <CertifyMarksheet {...props}  approved_level={"Dean"}/>} 
            />
            <Route exact path="/MarksCheckingForm/:course_id/:course_name/:approval_level" 
              render={() => <MarksCheckingForm/>} 
            />

            <Route exact path="/MarksCheckingForm/:course_id/:course_name/:approval_level" 
              render={() => <MarksCheckingForm/>} 
            />
           


            {/* Lecturer Profile */}
            <Route path="/lec_related_course">
              <LecRelatedCourses />
            </Route>
            <Route path="/ca_addby_lec/:course_id/:course_name">
              <AddCAMarksByLec/>
            </Route>
            <Route path="/cclandingpage">
              <CCDashBoard />
            </Route>
            <Route path="/viewcaeli">
              <ViewCAEligibile />
            </Route>
            <Route path="/caeli/:course_id/:course_name">
              <CAEligibility/>
            </Route>
            <Route path="/ccmarksapproval">
              <CCMarksApproval />
            </Route>

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
