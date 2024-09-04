import React from 'react'
import { useState } from "react";
import SetAcademicYear from './SetAcademicYear/SetAcademicYear';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SAProfile() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showToastMessage = (newStatus) => {
    if (newStatus) {
      toast.error('Failed to update academic year!');
      //to refresh in 2 sec
      setInterval(() => {
        window.location.reload();
      }, 2000);
      
    }
    else{
      toast.success('Academic year updated successfully!');
      //to refresh in 2 sec
      setInterval(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className=' container' style={{marginTop:"70px"}}>
            <div className=' py-4'>
              
                <div style={{float:"right"}}>
                  <button className=' btn btn-dark btn-sm' onClick={()=> setIsPopupVisible(true)}>Set Academic Year</button>
                </div>
                <SetAcademicYear 
                  isVisible={isPopupVisible} 
                  onClose={() => setIsPopupVisible(false)} 
                  status={showToastMessage}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh',marginTop:"100px"}}>
            <div className=' center' >
              <div className='row g-3'>

                <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Student Management</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <a href="/manageallstudents"  className="btn btn-primary btn-sm mt-2">To Form</a>
                  </div>
                </div>
                
                <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Staff Management</h5>
                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <a href="/managestaff"  className="btn btn-primary btn-sm mt-2">To Form</a>
                  </div>
                </div>

                {/* <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Attendences</h5>
                    
                    <a href="/attendencesysan"  className="btn btn-primary btn-sm mt-2">To Manage</a>
                  </div>
                </div> */}

              </div>

              <div className='row g-3 my-4'>

                <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Upload Attendences</h5>
                    
                    <a href="/attendencesysan"  className="btn btn-primary btn-sm mt-2">To Manage</a>
                  </div>
                </div>

                {/* <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Medicals</h5>
                    
                    <a href="/medicalsysan"  className="btn btn-primary btn-sm mt-2">To Manage</a>
                  </div>
                </div> */}
                
                <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Add New Course Module</h5>
                    
                    <a href="/sysanicoursemodule"  className="btn btn-primary btn-sm mt-2">To Add</a>
                  </div>
                </div>

                {/* <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Courses for Lecturers</h5>
                    
                    <a href="/assignleccourse"  className="btn btn-primary btn-sm mt-2">To Manage Form </a>
                  </div>
                </div> */}
                
              </div>

              <div className='row g-3 my-4'>

                <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Add Course to Related Departments</h5>
                    
                    <a href="/relateddeptreq"  className="btn btn-primary btn-sm mt-2">To Add</a>
                  </div>
                </div>

                <div className="card shadow m-4" style={{width: "18rem"}}>
                  <div className="card-body ">
                    <h5 className="card-title py-2">Students Courses Registration</h5>
                    
                    <a href="/screg"  className="btn btn-primary btn-sm mt-2">To Manage</a>
                  </div>
                </div>

              </div>
            </div>
            </div>
            <ToastContainer />
        </div>
  )
}
