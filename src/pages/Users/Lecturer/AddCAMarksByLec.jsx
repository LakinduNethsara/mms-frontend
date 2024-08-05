import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LecturerService from '../../../components/service/LecturerService';

export default function AddCAMarksByLec() {
    const { course_id, course_name } = useParams();
    const [evaluationCriteria, setEvaluationCriteria] = useState([]);
    const [students, setStudents] = useState([]);
    const [regStudent, setRegStudent] = useState([]);
    const [level, setLevel] = useState('');
    const [semester, setSemester] = useState('');
    const [reversedata, setReversedata] = useState('');
    const [caMarks, setCaMarks] = useState([]);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [selectedCriteria, setSelectedCriteria] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                console.log("Fetching all data...");
                // Reverse the courseId string
                const reversedString = course_id.split("").reverse().join("");
                console.log("Reversed string:", reversedString);

                // Extract characters at position 4 and 3 (considering 0-based index)
                const levelChar = reversedString.charAt(3); // Position 4
                const semesterChar = reversedString.charAt(2); // Position 3
                console.log("Level character:", levelChar);
                console.log("Semester character:", semesterChar);

                setReversedata(reversedString);
                setLevel(levelChar);
                setSemester(semesterChar);

                // Fetch Evaluation Criteria CA
                const evaluationCriteriaRes = await LecturerService.getEvaluationCriteriaCA(course_id);
                console.log("Evaluation Criteria:", evaluationCriteriaRes.content);
                setEvaluationCriteria(evaluationCriteriaRes.content);
                setSelectedCriteria(evaluationCriteriaRes.content[0]); // Set initial selected criteria

                // Fetch Students with no marks
                const notAddedStudentsRes = await LecturerService.getNotAddStudentsID(course_id);
                console.log("Students with no marks:", notAddedStudentsRes.content);
                setStudents(notAddedStudentsRes.content);

                // Fetch all related students
                const allRelatedStudentsRes = await LecturerService.getAllRelatedStudentID(course_id);
                const allRelatedStudents = allRelatedStudentsRes.content;
                console.log("All related students:", allRelatedStudents);
                setRegStudent(allRelatedStudents);

                // Create initial CA marks entries
                const initialCaMarks = allRelatedStudents.map(student => ({
                    student_id: student, // Adjust based on actual student ID property
                    course_id: course_id,
                    academic_year: '2023-2024',
                    level: levelChar,
                    semester: semesterChar,
                    assignment_name: '',
                    assignment_score: '',
                    evaluation_criteria_id: ''
                }));
                console.log("Initial CA Marks:", initialCaMarks);
                setCaMarks(initialCaMarks);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();
    }, [course_id]);

    useEffect(() => {
        const isLastStudent = currentStudentIndex >= regStudent.length - 1;
        const isLastStudentScoreFilled = caMarks[currentStudentIndex]?.assignment_score !== '';
        setIsSubmitDisabled(!(isLastStudent && isLastStudentScoreFilled));
    }, [currentStudentIndex, regStudent.length, caMarks]);

    const handleMarksChange = (e) => {
        console.log("Handling marks change for student:", regStudent[currentStudentIndex]);
        const updatedCaMarks = caMarks.map((mark, index) =>
            index === currentStudentIndex
                ? {
                      ...mark,
                      assignment_score: e.target.value,
                      assignment_name: selectedCriteria.assignment_name,
                      evaluation_criteria_id: selectedCriteria.id
                  }
                : mark
        );
        console.log("Updated CA Marks:", updatedCaMarks);
        setCaMarks(updatedCaMarks);
    };

    const handleNextClick = () => {
        console.log("Current student index:", currentStudentIndex);
        setCurrentStudentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevClick = () => {
        console.log("Current student index:", currentStudentIndex);
        setCurrentStudentIndex((prevIndex) => prevIndex - 1);
    };

    const handleCriteriaChange = (e) => {
        const selectedAssignmentName = e.target.value;
        const criteria = evaluationCriteria.find(c => c.assignment_name === selectedAssignmentName);
        setSelectedCriteria(criteria);
        console.log("Selected criteria:", criteria);
    };

    const handleSubmit = async () => {
        try {
            console.log("Submitting CA Marks:", caMarks);
            await LecturerService.submitCAMarks(caMarks);
            console.log("CA Marks submitted successfully!");
            // Optionally, add more logic here, such as redirecting or showing a success message
        } catch (error) {
            console.error("Error submitting CA Marks:", error);
        }
    };

    console.log(caMarks[currentStudentIndex]?.student_id);
    console.log(caMarks);

    return (
        <div className='container'>
            <div className='container' style={{ marginTop: "50px" }}>
                <h4>CA Marks Entry: <span style={{ color: "maroon" }}>{course_name} - {course_id}</span></h4>
                <br />
                {/* <h4>Level: {level}</h4>
                <h4>Semester: {semester}</h4>
                <h4>reversedata: {reversedata}</h4> */}
            </div>

        <div className=' row' >
            <div className=' col-6 p-4' style={{border:"1px solid black",marginRight:"20px"}}>
                <div>
                    <label className=' form-label'>Select Assessment Type:</label>
                    <select className="form-select" aria-label="Default select example" style={{ width: "200px" }} onChange={handleCriteriaChange}>
                        {
                            evaluationCriteria.map((criteria, index) => (
                                <option key={index}>{criteria.assignment_name}</option>
                            ))
                        }
                    </select>
                </div>
            
            

            
            <div style={{ marginTop: '70px',display:"flex"}}>
                {regStudent.length > 0 && (
                    <>
                        {console.log(regStudent[currentStudentIndex].id)}
                        <label>
                            Student ID : <span style={{ color: "maroon" }}> <b>{caMarks[currentStudentIndex].student_id}</b> </span>
                        </label>


                        <div style={{display:"flex"}}>
                        <label className=' form-label' style={{marginRight:"10px",paddingLeft:"40px"}}>
                            Marks :
                        </label>
                        <input className='form-control' style={{ width: '200px' }}
                            type="number"
                            value={caMarks[currentStudentIndex]?.assignment_score || ''}
                            onChange={handleMarksChange}
                        />
                        </div>
                    </>
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                <button className='btn btn-dark' onClick={handlePrevClick} disabled={currentStudentIndex === 0}>
                    Previous
                </button>
                <button className='btn btn-dark' onClick={handleNextClick} disabled={currentStudentIndex >= regStudent.length - 1} style={{ marginLeft: '10px' }}>
                    Next
                </button>
                <div style={{ marginTop: '20px' }}>
                {currentStudentIndex === regStudent.length - 1 && (
                    <p style={{color:"red"}}>Last Student ID...</p>
                )}
            </div>
            </div>
            </div>
            <div className=' col-5' style={{border:"1px solid black"}}>
                <div style={{ marginTop: '20px' }}>
                    <button className='btn btn-success' onClick={handleSubmit} disabled={isSubmitDisabled}>
                        Submit
                    </button>
                </div>
            </div>
        </div>

            

            <div className=' row'>
                <div className=' '></div>
            </div>

            
        </div>
    );
}
