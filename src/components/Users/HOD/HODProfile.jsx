import React, { useState, useEffect } from 'react';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../../components/common/AcademicYearManagerSingleton';
import axios from 'axios';

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
        getresultBoard();
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
                <h2>Certify Marks Return Sheet</h2>
                <div className="row">
                    {levels.map((level) => (
                        <div className="col-md-3 mb-4" key={level}>
                            <div className="card text-center functionCard">
                                <div className="card-body">
                                    <a href={`/CourseCard/${level}/${current_semester}/${department}`} className="btn btn-primary home-page-class-button">
                                        Level {level} Sem {current_semester}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>Results Board</h2>
                <div className="row">
                    {resultBoard.map((board) => (
                        <div className="col-md-4 mb-4" key={board.id}>
                            <div className="card text-center functionCard">
                                <div className="card-body">
                                  {console.log(board.department,board.level,board.semester,board.conducted_date_time)}
                                    <h5>{`Department: ${board.department}`}</h5>
                                    <p>{`Level: ${board.level}`}</p>
                                    <p>{`Semester: ${board.semester}`}</p>
                                    <p>{`Status: ${board.status}`}</p>
                                    {board.conducted_date_time && (
                                        <p>{`Conducted: ${new Date(board.conducted_date_time).toLocaleString()}`}</p>
                                    )}
                                    {
                                      board.status=="Started"?<a href={`/FinalMarkSheet/${board.level}/${board.semester}/${board.department}`} className="btn btn-primary">View </a>:null
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
