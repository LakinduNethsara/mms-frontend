import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CCResultsBoard() {
    const [resultBoard, setResultBoard] = useState([]);
    const [user, setUser] = useState({});
    const [courseName, setCourseName] = useState("");
    const [selectedResultBoard, setSelectedRB] = useState(null);
    const storedData = localStorage.getItem('user');
    const history = useHistory();

    useEffect(() => {
        if (storedData) {
            setUser(JSON.parse(storedData));
        } else {
            setUser(null);
        }
    }, [storedData]);

    const department = user?.department_id;
    const user_id = user?.user_id;

    useEffect(() => {
        if (department) {
            getResultBoard();
        }
    }, [department]);

    const getResultBoard = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/api/results_board/getAvailableResultsBoardsforDeanCC/${department}`);
            setResultBoard(response.data.content);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getAssignedResultSheet = async (resultBoardId) => {
        try {
            const response = await axios.get(`http://localhost:9090/api/results_board/getAssignedResultSheet/${user_id}/${resultBoardId}`);
            return response.data.content.course_id || ""; // Return courseId directly
        } catch (error) {
            console.error('Error fetching data:', error);
            return ""; // Return empty string on error
        }
    };

    const getCourseName = async (courseId) => {
        try {
            const response = await axios.get(`http://localhost:9090/api/courses/getcourse/${courseId}`);
            return response.data.content.course_name || ""; // Return courseName directly
        } catch (error) {
            console.error('Error fetching course name:', error);
            return ""; // Return empty string on error
        }
    };

    const handleBoardClick = async (board) => {
        setSelectedRB(board.id);
        const courseId = await getAssignedResultSheet(board.id); // Get courseId directly here

        if (courseId !== "" && board.status=="Started") {
            const name = await getCourseName(courseId); // Get course name
            history.push(`/RBMarksReturnSheet/${courseId}/${name}/${department}/${board.academic_year}`);
        } else if (courseId == "" && board.status=="Started"){
            history.push(`/FinalMarkSheet/${board.level}/${board.semester}/${board.department}`);
        }
    };

    return (
        <div className='container'>
            <h2>Results Board</h2>
            <div className="row">
                {resultBoard.map((board) => (
                    <div className="col-md-4 mb-4" key={board.id}>
                        <div className="card text-center functionCard" onClick={() => handleBoardClick(board)}>
                            <div className="card-body">
                                <h5>{`Department: ${board.department}`}</h5>
                                <p>{`Level: ${board.level}`}</p>
                                <p>{`Semester: ${board.semester}`}</p>
                                <p>{`Status: ${board.status}`}</p>
                                {board.conducted_date_time && (
                                    <p>{`Conducted: ${new Date(board.conducted_date_time).toLocaleString()}`}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
