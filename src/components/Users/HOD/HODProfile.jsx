import React, { useState, useEffect } from 'react';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../../components/common/AcademicYearManagerSingleton';
import axios from 'axios';
import BackButton from '../AR/BackButton/BackButton';

export default function HODProfile() {
    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
    const [current_semester, setCurrent_semester] = useState("");
    const [academicYear, setAcademicYear] = useState("");
    const [resultBoard, setResultBoard] = useState([{
        id: "",
        department: "",
        level: "",
        semester: "",
        academic_year: '2023-2024',
        status: "",
        created_date_time: "",
        conducted_date_time: ""
    }]);

    const levels = [1, 2, 3, 4];
    const semesters = [1, 2];

    useEffect(() => {
        const fetchAndSaveYear = async () => {
            const details = await fetchAcademicYear();
            if (details) {
                saveAcademicYearToLocal(details);
                setAcademicDetails(details);
            }
        };
        fetchAndSaveYear();
    }, []);

    useEffect(() => {
        setAcademicYear("2023-2024");
        setCurrent_semester("1");
        if (academicDetails) {
            setAcademicYear("2023-2024");
            setCurrent_semester("1");
        }
    }, [academicDetails]);

    const [user, setUser] = useState({});
    const storedData = localStorage.getItem('user');

    useEffect(() => {
        if (storedData) {
            setUser(JSON.parse(storedData));
        } else {
            setUser(null);
        }
    }, []);

    const department = user?.department_id;

    useEffect(() => {
        if (department) { // Ensure department is defined before fetching
            getresultBoard();
        }
    }, [department]);
    

    const getresultBoard = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/results_board/getAvailableResultsBoardsforDeanCC/${department}`);
            setResultBoard(response.data.content);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="container mt-4">
               
                
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card text-center functionCard">
                            <div className="card-body">
                                <a href={`/pendingHODCertifyMarksheet`} className="btn btn-primary home-page-class-button">
                                    Certify Marks Return Sheet
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row">
                    {levels.map((level) => (
                        <div className="col-md-3 mb-4" key={level}>
                            <div className="card text-center functionCard">
                                <div className="card-body">
                                    {semesters.map((semester) => (
                                    <a href={`/CourseCard/${level}/${semester}/${department}`} className="btn btn-primary home-page-class-button">
                                        Level {level} Sem {semester}
                                    </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}

                
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card text-center functionCard">
                            <div className="card-body">
                                <a href={`/ccresultsboard`} className="btn btn-primary home-page-class-button">
                                    Result Board
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
