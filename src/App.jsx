import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import FooterComponent from './components/common/Footer';
import SAProfile from './components/Users/System_Analyst/SAProfile';
import CCProfile from './components/Users/CC/CCProfile';
import AdminProfile from './components/Users/Admin/AdminProfile';
import DeanProfile from './components/Users/Dean/DeanProfile';
import HODProfile from './components/Users/HOD/HODProfile';
import VCProfile from './components/Users/VC/VCProfile';
import LecturerProfile from './components/Users/Lecturer/LecturerProfile';
import CourseCard from './components/common/CourseCard';

import HomePageAR from './pages/Users/AR/HomePage/HomePageAR';
import ViewMedicalPage from './pages/Users/AR/ViewMedicalTablePage/ViewMedicalPage';
import HomePageStudent from './pages/Users/Students/HomePageStudent/HomePageStudent';

import HODMarksReturnSheet from './components/common/HODMarksReturnSheet';
import MarksCheckingForm from './components/common/MarksCheckingForm';
import CertifyMarksheet from './components/common/CertifyMarksheet';
import DeanFinalMarkSheet from './components/common/DeanFinalMarkSheet';

import StudentmedicalView from './pages/Users/Students/StudentMedicalView/StudentMedicalView';
import StudentViewEligibility from './pages/Users/Students/StudentViewEligibility/StudentViewEligibility';
import StudentWithHeldSubjects from './pages/Users/Students/StudentWithHeldSubjects/StudentWithHeldSubjects';
import StudentMarkSheetList from './pages/Users/Students/StudentMarkSheetList/StudentMarkSheetList';
import StudentMarkSheetView from './pages/Users/Students/StudentMarksheetView/StudentMarkSheetView';
import StudentViewCourseDetails from './pages/Users/Students/StudentViewCourseDetails/StudentViewCourseDetails';
import StudentViewCourseCriteria from './pages/Users/Students/StudentViewCourseCriteria/StudentViewCourseCriteria';
import ABListPage from './pages/Users/AR/ABListPage/ABListPage';
import UpdateABPage from './pages/Users/AR/UpdateABPage/UpdateABPage';
import ViewMarks from './pages/Users/AR/ViewMarks/ViewMarks';
import ViewMarksTableValidations from './components/Users/AR/DataTable/ViewMarksTableValidations';

import AddCAMarksByLec from './pages/Users/Lecturer/AddCAMarksByLec';
import LecRelatedCourses from './components/Users/Lecturer/LecRelatedCourses';
import CCDashBoard from './pages/Users/CC/CCDashBoard';
import ViewCAEligibile from './pages/Users/CC/ViewCAEligibile';
import CAEligibility from './pages/Users/CC/CAEligibility';
import CCMarksApproval from './pages/Users/CC/CCMarksApproval';
import CourseCriteriaByCC from './pages/Users/CC/CourseCriteriaByCC';
import CreateResultBoard from './pages/Users/AR/CreateResultBoard/CreateResultBoard';
import ResultBoardMarksSheetAssign from './pages/Users/AR/ResultBoardMarksSheetAssign/ResultBoardMarksSheetAssign';
import ARJoinResultBoard from './pages/Users/AR/ARJoinResultBoard/ARJoinResultBoard';
import CertifyMarksPage from './pages/Users/AR/CertifyMarksPage/CertifyMarksPage';
import CCResultsBoard from './pages/Users/CC/CCResultsBoard';
import LecturersManagement from './pages/Users/System_Analyst/UsersManagement/LecturersManagement';
import AttendanceEligibilityManage from './pages/Users/System_Analyst/Attendance/AttendanceEligibilityManage';
import MedicalsEligibiltyManage from './pages/Users/System_Analyst/Medical/MedicalsEligibiltyManage';
import ManageCourseModule from './pages/Users/System_Analyst/CourseModule/ManageCourseModule';
import AssignLecturerCourse from './pages/Users/System_Analyst/AssignLecturer/AssignLecturerCourse';
import StudentRegCourses from './pages/Users/System_Analyst/StudentCourseReg/StudentRegCourses';




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
              <Route exact path="/viewMedicals" component={ViewMedicalPage} />      {/* Link to view medical table page */}
              <Route exact path="/viewablist" component={ABListPage} />           {/* Link to view AB student list page */}
              <Route exact path="/viewABUpdate/updateAB/:course_id/:course_name/:student_id/:grade/:exam_type/:academic_year" component={UpdateABPage} />   {/* Link to AB status update form */}
              
              <Route path="/arviewictmarks">  {/* Link to view ICT marks page - Level selection */}
                <ViewMarks department_id={"ICT"}/>
              </Route>

              <Route path="/arviewetmarks">  {/* Link to view ET marks page - Level selection */}
                <ViewMarks department_id={"ET"}/>
              </Route>

              <Route path="/arviewbstmarks">  {/* Link to view BST marks page - Level selection */}
                <ViewMarks department_id={"BST"}/>
              </Route>

              <Route path="/arviewmtdmarks">    {/* Link to view Multi Disciplinary marks page - Level selection */}
                <ViewMarks department_id={"Multi_Disciplinary"}/>
              </Route>


              <Route path="/viewMarks/:course_id/:course_name">   {/* Link to view marks remaining to approve page validations */}
                <ViewMarksTableValidations/>
              </Route>

              <Route path="/ARMarksReturnSheet/:course_id/:course_name">    {/* Link to view ar Marks certify sheet*/}
                <HODMarksReturnSheet approved_level={"HOD"}/>
              </Route>

              <Route path="/createResultsBoard">   {/* Link to create results board page */}
                <CreateResultBoard/>
              </Route>

              <Route path="/arViewResultsBoard">  {/* Link to view results board page */}
                <ResultBoardMarksSheetAssign/>
              </Route>  

              <Route path ="/arJoinResultsBoard">         {/* Link to join results board page */}
                <ARJoinResultBoard/>
              </Route>

              <Route path="/arCertifyMarks">  {/* Link to certify ICT marks page */}
                <CertifyMarksPage/>
              </Route>

              <Route path="/arFinalMarkSheet/:level/:semester/:dept">   {/* Link to view marks remaining to certify page */}
              <DeanFinalMarkSheet approved_level={"RB"}/>
            </Route>
            
            {/* AR navigations ends here ---------------------------------------------*/}



            <Route exact path="/vc_profile" component={VCProfile} />




            {/* Student navigations starts here ---------------------------------------------*/}
            <Route exact path="/st_profile" component={HomePageStudent} />                      {/* Student Home Page */}
            <Route exact path="/studentMedicalView" component={StudentmedicalView} />           {/* Student Medical View */}
            <Route exact path="/studentEligibilityView" component={StudentViewEligibility} />       {/* Student Eligibility View */}
            <Route exact path="/studentViewWithHeldSubjects" component={StudentWithHeldSubjects} />    {/* Student View With Held Subjects */}
            <Route exact path="/StudentViewMarkSheetList" component={StudentMarkSheetList} />           {/* Student View Mark Sheet List */}
            <Route exact path="/viewPublishedMarksSheet" component={StudentMarkSheetView} />            {/* Student View Published Marks Sheet */}
            <Route exact path="/studentViewCourseDetails" component={StudentViewCourseDetails} />       {/* Student View Course Details */}
            <Route exact path="/studentViewCourseCriteria" component={StudentViewCourseCriteria} />        {/* Student View Course Criteria */}
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
            <Route exact path="/RBMarksReturnSheet/:course_id/:course_name/:department" 
              render={(props) => <HODMarksReturnSheet {...props}  approved_level={"AssignedRB"} />} 
            />
            <Route exact path="/lMarksReturnSheet/:course_id/:course_name/:department" 
              render={(props) => <HODMarksReturnSheet {...props}  approved_level={"course_coordinator"} />} 
            />

            <Route path="/FinalMarkSheet/:level/:semester/:dept"> 
              <DeanFinalMarkSheet approved_level={"HOD"}/>
            </Route>

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
            <Route path="/cccbycc">
              <CourseCriteriaByCC />
            </Route>


            <Route path="/ccresultsboard">
              <CCResultsBoard />
            </Route>

            {/* System analyst */}
            <Route path="/managestaff">
              <LecturersManagement />
            </Route>

            <Route path="/attendencesysan">
              <AttendanceEligibilityManage />
            </Route>

            <Route path="/medicalsysan">
              <MedicalsEligibiltyManage />
            </Route>

            <Route path="/sysanicoursemodule">
              <ManageCourseModule />
            </Route>

            <Route path="/assignleccourse">
              <AssignLecturerCourse />
            </Route>

            <Route path="/screg">
              <StudentRegCourses />

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



