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
                                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
    
                                    <div className="offcanvas-body">
    
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/ar_profile">
                                                Dashboard
                                                </a>
                                            </li>
    
                                            <li className="nav-item">
                                                <a className="nav-link" href="/viewMedicals">
                                                Medicals List
                                                </a>
                                            </li>
    
                                            <li className="nav-item">
                                                <a className="nav-link" href="/viewablist">
                                                Exam Absentees
                                                </a>
                                            </li>
    
                                            {/* <hr></hr> */}
                                            <li className="nav-item dropdown">
                                                <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                >
                                                Marks return sheets
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item" href="/arviewictmarks">
                                                        Department of ICT
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/arviewetmarks">
                                                        Department of ET
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/arviewbstmarks">
                                                        Department of BST
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="/arviewmtdmarks">
                                                        Department of Multi Disciplinary
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            {/* <hr></hr> */}
    
                                            <li className="nav-item">
                                                <a className="nav-link" href="/createResultsBoard">
                                                Manage Results Boards
                                                </a>
                                            </li>
    
                                            <li className="nav-item">
                                                <a className="nav-link" href="/arCertifyMarks">
                                                Certify Marks
                                                </a>
                                            </li>
    
    
    
    
    
                                        </ul>
                                        
                                    </div>
                                </>
    
    
                            ):user.role == 'student'? (                //Nave bar links for student

                                <>
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
    
                                    <div className="offcanvas-body">
    
                                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/st_profile">             {/*Link to the student dashboard*/}
                                                Dashboard
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/studentMedicalView">        {/*Link to the student medical view*/}    
                                                Medicals
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/studentEligibilityView">      {/*Link to the student eligibility view*/}
                                                Eligibility
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/studentViewWithHeldSubjects">       {/*Link to the student with held subjects*/}
                                                With held Subjects
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/StudentViewMarkSheetList">        {/*Link to the student mark sheet list*/}
                                                Published Marks Sheets
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="/studentViewCourseDetails">      {/*Link to the student course details*/}
                                                Course Details
                                                </a>
                                            </li>

                                        </ul>
                                        
                                    </div>
                                </>
    
    
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
