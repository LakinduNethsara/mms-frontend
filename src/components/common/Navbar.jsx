import React, { useState, useEffect } from 'react';
import { IoMenuSharp } from 'react-icons/io5';

function Navbar() {
    const [user, setUser] = useState({
        
    });

    const storedData = localStorage.getItem('user');
    useEffect(() => {
        if(storedData){
            setUser(JSON.parse(storedData));
        }else{
            setUser(null);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        window.location.href="/";
    }

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                {
                    user != null ? 
                    
                        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"  role="button" aria-controls="offcanvasExample">
                            <IoMenuSharp size="35"/>
                        </a>                    
                    :null
                }
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">

                    {
                        user !=null? (
                            user.role == 'ar'? (                    //Nave bar links fro Assistant Registrar

                                <>
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Welcome {user.name_with_initials}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <hr/>
    
                                    <div className="offcanvas-body">
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/ar_profile">          {/*Link to the Assistant Registrar dashboard*/}
                                                Dashboard
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/viewMedicals">            {/*Link to the medicals list*/}
                                                Medicals List
                                                </a>
                                            </li>
    
                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" href="/viewablist">                                 {/*Link to the absentees list*/}
                                                Exam Absentees
                                                </a>
                                            </li>
    
                                            {/* <hr></hr> */}
                                            <li className="nav-item dropdown" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a
                                                className="nav-link active dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                >                               {/*Link to the marks return sheets*/}
                                                Marks return sheets
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item" href="/arviewictmarks">            {/*Link to the ICT department marks return sheet*/}
                                                        Department of ICT
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/arviewetmarks">             {/*Link to the ET department marks return sheet*/}
                                                        Department of ET
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/arviewbstmarks">            {/*Link to the BST department marks return sheet*/}
                                                        Department of BST
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/arviewmtdmarks">            {/*Link to the MTD department marks return sheet*/}
                                                        Department of Multi Disciplinary
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            {/* <hr></hr> */}
    
                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" href="/createResultsBoard">              {/*Link to the create results board*/}
                                                Manage Results Boards
                                                </a>
                                            </li>
    
                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" href="/arCertifyMarks">                  {/*Link to the certify marks*/}
                                                Certify Marks
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" href="/arPublishedMarkSheets">                  {/*Link to the certify marks*/}
                                                Published Marks Sheets
                                                </a>
                                            </li>
    
                                        </ul>
                                        
                                    </div>
                                </>
    
    
                            ):user.role == 'student'? (                //Nave bar links for student

                                <>
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Welcome {user.name_with_initials}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>

                                    <hr/>
    
                                    <div className="offcanvas-body">
    
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/st_profile">             {/*Link to the student dashboard*/}
                                                Dashboard
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/studentMedicalView">        {/*Link to the student medical view*/}    
                                                Medicals
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/studentEligibilityView">      {/*Link to the student eligibility view*/}
                                                Eligibility
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/studentViewWithHeldSubjects">       {/*Link to the student with held subjects*/}
                                                With held Subjects
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/StudentViewMarkSheetList">        {/*Link to the student mark sheet list*/}
                                                Published Marks Sheets
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/studentViewCourseDetails">      {/*Link to the student course details*/}
                                                Course Details
                                                </a>
                                            </li>

                                        </ul>
                                        
                                    </div>
                                </>
    
    
                            ):user.role == 'admin'? (
                                <>
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Welcome {user.name_with_initials}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>

                                    <hr/>
    
                                    <div className="offcanvas-body">
    
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/admin_profile">             
                                                Admin Profile
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ):user.role=='system_analyst'? (
                                <>
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Welcome {user.name_with_initials}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>

                                    <hr/>
    
                                    <div className="offcanvas-body">
    
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/system_analyst_profile">             
                                                Dashboard
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/manageallstudents">             
                                                Student Management
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/managestaff">             
                                                Staff Management
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/attendencesysan">             
                                                Attendences
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/medicalsysan">             
                                                Medicals
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/sysanicoursemodule">             
                                                Course Module
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/assignleccourse">             
                                                Courses for Lecturers
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/screg">             
                                                Students Courses Registration
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ):user.role=='lecturer'? (
                                <>
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Welcome {user.name_with_initials}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>

                                    <hr/>
    
                                    <div className="offcanvas-body">
    
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/lec_profile">             
                                                Dashboard
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/lec_related_course">        
                                                Add CA Marks
                                                </a>
                                            </li>

                                            <li className="nav-item" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a className="nav-link active" aria-current="page" href="/lec_related_course_fa">      
                                                Add FA Marks
                                                </a>
                                            </li>

                                            <li className="nav-item dropdown" style={{backgroundColor:"rgba(99, 99, 99, 0.15)",border: "1px solid #ffffff",paddingLeft:"10px",marginBottom:"7px",borderRadius:"5px"}}>
                                                <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                >
                                                Course Coordinate
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item" href="/ccmarksapproval">
                                                        Marks Approval
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/viewcaeli">
                                                        View CA Eligibility
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/cccbycc">
                                                        Courses Criteria
                                                        </a>
                                                    </li>
                                                    
                                                </ul>
                                            </li>



                                        </ul>
                                        
                                    </div>
                                </>
                            ):user.role=='dean'? (
                                null            //Nave bar links for dean
                            ):user.role=='hod'? (
                                null            //Nave bar links for hod
                            ):user.role=='vc'? (
                                null            //Nave bar links for vc
                            ):(null)
                        ):(
                            null
                        )
                        
                    }

                    
                </div>
                <a className="navbar-brand" href="#">
                    <img src="src/assets/LOGO_OF_RUHUNA-removebg-preview.png" alt="Logo" width="17" height="24" className="d-inline-block align-text-top"/>
                    &nbsp;&nbsp;Faculty of Technology | UOR
                </a>
                {
                    user != null?<button type="button" onClick={logout} className="btn btn-outline-dark btn-sm" style={{widows:"100px"}}>LOGOUT</button>:null
                }
                
            </div>
        </nav>
    );
}

export default Navbar;
