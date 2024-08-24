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

    

    

    const handleBoardClick = async (board) => {
        setSelectedRB(board.id);
        // Get courseId directly here

        if (board.status=="Started") {
          console.log(board.id,board.level,board.semester,board.department,board.academic_year)
            history.push(`/ccAssignedResultSheet/${board.id}/${board.level}/${board.semester}/${board.department}/${board.academic_year}`);
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
