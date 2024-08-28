import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import BackButton from '../../../components/Users/AR/BackButton/BackButton';

export default function CCAssignedResultSheet() {
    const storedData = localStorage.getItem('user');
    const [user, setUser] = useState({});
    const [courseCards, setCourseCards] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading true
    const { id, level, semester, department, academic_year } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (storedData) {
            setUser(JSON.parse(storedData));
        } else {
            setUser(null);
        }
    }, [storedData]);

    const user_id = user?.user_id;

    useEffect(() => {
        const fetchData = async () => {
            if (user_id && id) {
                try {
                    const response = await axios.get(`http://192.248.50.155:9090/api/results_board/getAssignedResultSheet/${user_id}/${id}`);
                    let data = response.data.content || [];

                    // Ensure data is always an array
                    if (!Array.isArray(data)) {
                        data = [data];
                    }

                    setCourseCards(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setCourseCards([]);
                } finally {
                    setLoading(false); // Set loading to false when done
                }
            } else {
                setLoading(false); // Set loading to false if user_id or id is missing
            }
        };

        fetchData();
    }, [user_id, id]);

    const getCourseName = async (courseId) => {
        try {
            const response = await axios.get(`http://192.248.50.155:9090/api/courses/getcourse/${courseId}`);
            return response.data.content.course_name || "";
        } catch (error) {
            console.error('Error fetching course name:', error);
            return "";
        }
    };

    const handleCourseClick = async (course) => {
        if (course && course.course_id) {
            const name = await getCourseName(course.course_id);
            history.push(`/RBMarksReturnSheet/${course.course_id}/${name}/${department}/${academic_year}`);
        } else if (!course) {
            history.push(`/FinalMarkSheet/${level}/${semester}/${department}/${academic_year}`);
        }
    };

    if (loading) {
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>
    </div>; // Display a loading indicator
    }

    return (
        <div className="row">
            <BackButton />
            {/* Render Final Mark Sheet Card */}
            <div className="col-md-4 mb-4">
                <div className="card text-center functionCard" onClick={() => history.push(`/FinalMarkSheet/${level}/${semester}/${department}/${academic_year}`)}>
                    <div className="card-body">
                        <h2>Final Mark Sheet</h2>
                        <p>{`Department: ${department}`}</p>
                        <p>{`Level: 0${level}`}</p>
                        <p>{`Semester: 0${semester}`}</p>
                        <p>{`Academic Year: ${academic_year}`}</p>
                    </div>
                </div>
            </div>

            {/* Render Course Cards */}
            {courseCards.length > 0 ? (
                courseCards.map((course) => (
                    <div className="col-md-4 mb-4" key={course.id}>
                        <div className="card text-center functionCard" onClick={() => handleCourseClick(course)}>
                            <div className="card-body">
                                <h5>Marks Return Sheet</h5>
                                <p>{`Course code: ${course.course_id}`}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-12 text-center"></div> // Display when no data is available
            )}
        </div>
    );
}
