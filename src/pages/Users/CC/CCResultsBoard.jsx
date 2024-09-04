import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackButton from '../../../components/Users/AR/BackButton/BackButton';

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
            const response = await axios.get(`http://192.248.50.155:9090/api/results_board/getAvailableResultsBoardsforDeanCC/${department}`);
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
        <div className='container' style={{ marginTop: "70px" }}>
            <BackButton/>
            <h2>Results Board</h2>
            <div className="row g-3 my-4">
                {resultBoard.map((board) => (

                    <>
                    {/* <div className="col-md-4 mb-4" key={board.id}>
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
                    </div> */}

                    <div className="card shadow m-4" style={{width: "18rem"}} key={board.id}>
                        <div className="card-body ">
                            <h5 className="card-title py-2"> <b> {`Department: ${board.department}`} </b> </h5>
                            <p style={{fontStyle:"bold",justifyContent: 'center', alignItems: 'center'}}>
                                <b>
                                {`Level: ${board.level}`} &nbsp; &nbsp;
                                {`Semester: ${board.semester}`} <br />
                                {`Status: ${board.status}`} <br />
                                {board.conducted_date_time && (
                                    `Conducted: ${new Date(board.conducted_date_time).toLocaleString()}`
                                )}
                                </b>

                            </p>
                            <button className="btn btn-primary btn-sm mt-2" onClick={() => handleBoardClick(board)}>To Result Board</button>
                        </div>
                    </div>

                    </>


                ))}


            </div>
        </div>
    );
}
