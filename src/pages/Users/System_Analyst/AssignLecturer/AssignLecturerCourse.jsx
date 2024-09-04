import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../../../components/common/AcademicYearManagerSingleton';

export default function AssignLecturerCourse() {
    const [cids, setCids] = useState([]);
    const [cCoordinatorids, setCCoordinatorids] = useState([]);
    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
    const [academicYear, setAcademicYear] = useState("");
    const [current_semester, setCurrentSemester] = useState("");
    const [newCourseCoordinator, setNewCourseCoordinator] = useState({
        user_id: '',
        course_id: '',
        academic_year: '',
        selectedLecturerIds: []
    });

    const [loader, setLoader] = useState(false);
    const [getDeptID, setDeptID] = useState();
    const storedData = localStorage.getItem('user');

    console.log(getDeptID);

    useEffect(() => {
        loadCids();
    }, [academicYear, current_semester]);

    useEffect(() => {
        const fetchAndSaveYear = async () => {
            const details = await fetchAcademicYear();
            if (details) {
                saveAcademicYearToLocal(details);
                setAcademicDetails(details);
                setAcademicYear(details.current_academic_year);
                setCurrentSemester(details.current_semester);
            }
        };

        fetchAndSaveYear();
    }, []);

    useEffect(() => {
        if(storedData){
            
            setDeptID(JSON.parse(storedData).department_id);
        }else{

            setDeptID(null);
        }
        
    }, [getDeptID]);


    const loadCids = async () => {
        setLoader(true);
        if (!academicYear || !current_semester) {
            setLoader(false);
            return;
        } else {
            try {
                const response = await axios.get(`http://localhost:9090/api/courses/allcoursesids/${academicYear}/${current_semester}`);
                if (Array.isArray(response.data.content)) {
                    setCids(response.data.content.map(cid => ({ value: cid, label: cid })));
                } else {
                    console.error("Expected an array of course IDs, but received:", response.data.content);
                }
            } catch (error) {
                console.error("Error fetching course IDs:", error);
            }
        }

        try {
            const result = await axios.get(`http://localhost:9090/api/lecreg/get/getAllLecurerDetails/${getDeptID}`);
            if (Array.isArray(result.data.content)) {
                setCCoordinatorids(result.data.content.map(coordinator => ({
                    value: coordinator.user_id,
                    label: coordinator.full_name
                })));
            } else {
                console.error("Expected an array of course coordinator IDs, but received:", result.data.content);
            }
        } catch (error) {
            console.error("Error fetching course coordinator IDs:", error);
        }

        setLoader(false);
    };

    const handleLecturerIdSelect = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setNewCourseCoordinator(prevState => ({
            ...prevState,
            selectedLecturerIds: selectedIds
        }));
    };

    const handleSubmit = async () => {
        if (!newCourseCoordinator.user_id || !newCourseCoordinator.course_id || newCourseCoordinator.selectedLecturerIds.length === 0) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            

            await axios.post('http://localhost:9090/api/ccmanage/insertacc', newCourseCoordinator);
            toast.success("Course coordinator data inserted successfully.");
            handleClear();

            setNewCourseCoordinator({
                user_id: '',
                course_id: '',
                academic_year: '',
                selectedLecturerIds: []
            });
            
        } catch (error) {
            toast.error("Error inserting course coordinator data: " + error.message);
        }
    };

    const handleClear = () => {

        setInterval(() => {
            window.location.reload();
        }, 2000);
        
    };

    const handleCourseCodeChange = (selectedOption) => {
        setNewCourseCoordinator(prevState => ({
            ...prevState,
            course_id: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleCourseCoordinatorChange = (selectedOption) => {
        setNewCourseCoordinator(prevState => ({
            ...prevState,
            user_id: selectedOption ? selectedOption.value : '',
            academic_year: academicYear  // Set academic year when course is selected
        }));
    };

    return (
        <div className='container' style={{ marginTop: "70px" }}>
            <div className='mt-4 mb-5'>
                <div className='h2 mt-lg-5'>Assign Lecturer for Course Module</div>
            </div>
            <ToastContainer />

            {
                loader ? (
                    <div style={{ margin: "100px", display: "flex" }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className=' h4 mx-3' style={{ color: "maroon" }}>Data is Loading...</div>
                    </div>
                ) : (
                    <div>
                        <form>
                            <div className="row g-3 my-1">
                                
                                <div className="col-md">
                                    <label htmlFor="type">Course Code</label>
                                    <div className="form-floating">
                                        <Select
                                            options={cids}
                                            onChange={handleCourseCodeChange}
                                            placeholder="Search Course Code"
                                            value={cids.find(option => option.value === newCourseCoordinator.course_id) || null}
                                        />
                                    </div>
                                </div>

                                <div className="col-md">
                                    <label htmlFor="type">Course Coordinator</label>
                                    <div className="form-floating">
                                        <Select
                                            options={cCoordinatorids}
                                            onChange={handleCourseCoordinatorChange}
                                            placeholder="Search Course Coordinator By Name"
                                            value={cCoordinatorids.find(option => option.value === newCourseCoordinator.user_id) || null}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row g-3 my-1">
                                <div className="col-md">
                                    <label htmlFor="type">Lecturer names</label>
                                    <div className="form-floating">
                                        <Select
                                            options={cCoordinatorids}
                                            onChange={handleLecturerIdSelect}
                                            placeholder="Search Lecturer By Name"
                                            isMulti
                                            value={cCoordinatorids.filter(option => newCourseCoordinator.selectedLecturerIds.includes(option.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='my-3'>
                            <button type="button" onClick={handleSubmit} className="btn btn-outline-dark btn-sm" style={{ width: "100px" }}>Submit</button>
                            <button type="button" onClick={handleClear} className="btn btn-outline-danger mx-2 btn-sm" style={{ width: "100px" }}>Clear All</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
