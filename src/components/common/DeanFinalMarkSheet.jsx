import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import SignatureForApproval from './SignatureForApproval';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from './AcademicYearManagerSingleton';
import DateObject from 'react-date-object';

export default function DeanFinalMarkSheet(props) {
  const [finalResults, setFinalResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const { level, semester, dept } = useParams();
  const [studentGPA, setStudentGPA] = useState([{}]);
  const history = useHistory();
  const [error, setError] = useState("");
  const { approved_level } = props;
  const [newSignature, setNewSignature] = useState();
  const [nextApprovedlevel, setNextApprovedlevel] = useState("");
  const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
  const [academicYear, setAcademicYear] = useState("");
  const[Allcourses,setAllCourses]=useState([]);

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
  // const { oktaAuth, authState } = useOktaAuth();
   const userNameAuth = user?.full_name;

   console.log(userNameAuth)

  var date = new DateObject({
    date: new Date(),
  });

  const [ARSign, setARSign] = useState({
    "level": "",
    "semester": "",
    "approved_user_id": "",
    "approval_level": "",
    "academic_year": "",
    "date_time": "",
    "department_id": "",
    "signature": ""
  });

  const [DeanSign, setDeanSign] = useState({
    "level": "",
    "semester": "",
    "approved_user_id": "",
    "approval_level": "",
    "academic_year": "",
    "date_time": "",
    "department_id": "",
    "signature": ""
  });

  const [VCSign, setVCSign] = useState({
    "level": "",
    "semester": "",
    "approved_user_id": "",
    "approval_level": "",
    "academic_year": "",
    "date_time": "",
    "department_id": "",
    "signature": ""
  });

  const approval = {
    "level": level,
    "semester": semester,
    "approved_user_id": userNameAuth,
    "approval_level": nextApprovedlevel,
    "academic_year": academicYear,
    "date_time": date.format(),
    "department_id": dept,
    "signature": newSignature
  };

  useEffect(() => {
    const fetchAndSaveYear = async () => {
      const details = await fetchAcademicYear();
      if (details) {
        saveAcademicYearToLocal(details);
        setAcademicDetails(details);
        setAcademicYear(details.current_academic_year);
      }
    };

    fetchAndSaveYear();
  }, []);

  const resultSheet = async () => {
    try {
      if (approved_level === "RB") {
        setNextApprovedlevel("AR");
      } else if (approved_level === "AR") {
        setNextApprovedlevel("Dean");
      } else if (approved_level === "Dean") {
        setNextApprovedlevel("VC");
      }
      console.log(approved_level, nextApprovedlevel);

      const result = await axios.get(`http://localhost:9090/api/studentMarks/GetApprovedMarksByLS/${level}/${semester}/${approved_level}/${dept}`);
      const data = result.data.content;

      const gpa = await axios.get(`http://localhost:9090/api/gpa/GetGPAByLevelSemester/${level},${semester}`);
      const gpaData = gpa.data.content;
      setStudentGPA(gpaData);

      const processedData = data.reduce((acc, curr) => {
        const existingStudent = acc.find(student => student.student_id === curr.student_id);
        const gpaInfo = gpaData.find(ele => ele.student_id === curr.student_id);
        if (existingStudent) {
          existingStudent.courses.push({
            course_id: curr.course_id,
            overall_score: curr.total_rounded_mark,
            grade: curr.grade,
          });
        } else {
          acc.push({
            student_id: curr.student_id,
            courses: [{
              course_id: curr.course_id,
              overall_score: curr.total_rounded_mark,
              grade: curr.grade,
            }]
          });
        }
        return acc;
      }, []);

      try {

      } catch (error) {
        console.error('Error fetching GPA data:', error.response || error.message);
      }

      setFinalResults(processedData);

      const courseIdsSet = new Set();
      processedData.forEach(student => {
        student.courses.forEach(course => {
          courseIdsSet.add(course.course_id);
        });
      });
      setCourses(Array.from(courseIdsSet));

      setStudents(processedData.map(student => student.student_id));

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    resultSheet();
  }, [level, semester, approved_level]);

  const handleSubmit = async (e) => {
    let response = null;
    e.preventDefault();
    try {
      console.log(approval.academic_year, approval.approval_level, approval.approved_user_id, approval.date_time, approval.department_id, approval.level, approval.semester, approval.signature);
      // Use the nextApprovedlevel variable directly in the network request
      response = await axios.post(`http://localhost:9090/api/approvalLevel/updateApprovalLevelByDean`, approval);

      toast.success("Result sheet approved successfully");

      setTimeout(() => {
        history.goBack();
      }, 3000);
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setError("Network error. Please check your network connection");
        console.error("Network error: ", error);
        toast.error("Network error. Please check your network connection");
      } else {
        setError("Failed to update approval level");
        console.error("Error updating approval level: ", error);
        toast.error("Failed to update approval level");
      }
    }
  };

  const saveDigitalSignature = (url) => {
    setNewSignature(url);
  };

  const fetchSignature = async () => {
    try {
      const ARSign = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${level}/${semester}/${dept}/AR/${academicYear}`);
      setARSign(ARSign.data.content);
      const DeanSign = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${level}/${semester}/${dept}/Dean/${academicYear}`);
      setDeanSign(DeanSign.data.content);
      const VCSign = await axios.get(`http://localhost:9090/api/approvalLevel/getSignature/${level}/${semester}/${dept}/VC/${academicYear}`);
      setVCSign(VCSign.data.content);

      console.log(ARSign.data.content);
      console.log(DeanSign.data.content);
      console.log(VCSign.data.content);

    } catch (error) {
      console.error('Error fetching signature data:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchSignature();
  }, [level, semester, dept, approved_level, academicYear]);



  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await axios.get(`http://localhost:9090/api/courses/getcidcnamebydls/${dept}/${level}/${semester}`);
        setAllCourses(courses.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, [level, semester, dept]);
  


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (newSignature) {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires returnValue to be set
      }
    };
  
    const handleUnload = () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    // Cleanup the event listener on component unmount
    return handleUnload;
  }, [newSignature]);


  // Function to format academic year from YYYY-YYYY to YYYY/YYYY
const formatAcademicYear = (academicYear) => {
  if (academicYear) {
    const [startYear, endYear] = academicYear.split('-');
    return `${startYear}/${endYear}`;
  }
  return academicYear; // Return as-is if format is unexpected
};
  
const cellStyle = {
  padding: '8px',
  textAlign: 'left',
  border: '1px solid #ccc',
};

const rowStyle = {
  backgroundColor: '#fff',
};

const alternateRowStyle = {
  backgroundColor: '#f2f2f2',
};

  




  return (
    <div className="container" style={{marginTop:'70px'}}>
      <ToastContainer/>
      {finalResults.length !== 0 ? (
        <>
         <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <h2 style={{ marginBottom: '5px', fontFamily: 'Arial, sans-serif', color: '#333' }}>University of Ruhuna</h2>
  <h2 style={{ marginBottom: '5px', fontFamily: 'Arial, sans-serif', color: '#333' }}>Faculty of Technology</h2>
  <h5 style={{ marginBottom: '5px', fontFamily: 'Arial, sans-serif', color: '#555' }}>Bachelor of Information and Communication Technology Honours Degree</h5>
  <h5 style={{ marginBottom: '5px', fontFamily: 'Arial, sans-serif', color: '#555' }}>Level {level}     Semester {semester}     <br/>    Academic year {formatAcademicYear(academicYear)}</h5>
  <h5 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', color: '#777' }}>Provisional results subject to confirmation by the Senate</h5>
</div>


          <div className=' shadow-lg' style={{display:'flex'}}>

          <div
  className="description"
  style={{
    padding: '10px',
    margin: '20px',
    float: 'left',
    marginLeft: '50px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  }}
>
  <h5 style={{ textAlign: 'center', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>
    Key to Grading
  </h5>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <tbody>
      <tr>
        <td style={cellStyle}>A+</td>
        <td style={cellStyle}>4.00</td>
        <td style={cellStyle}>A</td>
        <td style={cellStyle}>4.00</td>
      </tr>
      <tr style={{ backgroundColor: '#f2f2f2' }}>
        <td style={cellStyle}>A-</td>
        <td style={cellStyle}>3.70</td>
        <td style={cellStyle}>B+</td>
        <td style={cellStyle}>3.30</td>
      </tr>
      <tr>
        <td style={cellStyle}>B</td>
        <td style={cellStyle}>3.00</td>
        <td style={cellStyle}>B-</td>
        <td style={cellStyle}>2.70</td>
      </tr>
      <tr style={{ backgroundColor: '#f2f2f2' }}>
        <td style={cellStyle}>C+</td>
        <td style={cellStyle}>2.30</td>
        <td style={cellStyle}>C</td>
        <td style={cellStyle}>2.00</td>
      </tr>
      <tr>
        <td style={cellStyle}>C-</td>
        <td style={cellStyle}>1.70</td>
      </tr>
      <tr style={{ backgroundColor: '#f2f2f2' }}>
        <td style={cellStyle}>D+</td>
        <td style={cellStyle}>1.30</td>
        <td style={cellStyle}>D</td>
        <td style={cellStyle}>1.00</td>
      </tr>
      <tr>
        <td style={cellStyle}>E</td>
        <td style={cellStyle}>0.00</td>
      </tr>
      <tr style={{ backgroundColor: '#f2f2f2' }}>
        <td style={cellStyle}>F</td>
        <td style={cellStyle}>CA Fail</td>
      </tr>
      <tr>
        <td style={cellStyle}>MC</td>
        <td style={cellStyle}>Accepted Medical Certificate</td>
      </tr>
      <tr style={{ backgroundColor: '#f2f2f2' }}>
        <td style={cellStyle}>AC</td>
        <td style={cellStyle}>Accepted Academic Concession (Acceptable reason by the Senate other than the Medical)</td>
      </tr>
      <tr>
        <td style={cellStyle}>WH</td>
        <td style={cellStyle}>Results Withheld</td>
      </tr>
      <tr style={{ backgroundColor: '#f2f2f2' }}>
        <td style={cellStyle}>E*</td>
        <td style={cellStyle}>Not Eligible/Not Applied/Absent without Medical</td>
      </tr>
    </tbody>
  </table>
</div>


<div
  style={{
    marginLeft: '400px',
    marginTop: '50px',
    float: 'right',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    padding: '10px'
  }}
>
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <tbody>
      {Allcourses.map((id, index) => (
        <React.Fragment key={index}>
          <tr style={index % 2 === 0 ? rowStyle : alternateRowStyle}>
            <td style={cellStyle}>{id.course_id}</td>
            <td style={cellStyle}>{id.course_name}</td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div>


        </div>

          <div className="">
            <table className="overflow-x-scroll table border shadow table-hover" style={{ marginTop: "60px" }}>
              <thead>
                <tr>
                  <th scope="col" className='table-info'>Student ID</th>
                  {Allcourses.map((id, index) => (
                    <React.Fragment key={index}>
                      {nextApprovedlevel=="RB" || nextApprovedlevel=="AR" || nextApprovedlevel=="Dean" ?<th className=' table-secondary'>{id.course_id}</th>:null}
                      <th className=' table-primary'>Grade</th>
                    </React.Fragment>
                  ))}
                  <th scope="col" className=' table-warning'>SGPA</th>
                  <th scope="col" className=' table-success'>CGPA</th>
                </tr>
              </thead>
              <tbody>
                {finalResults.map((student, index) => (
                  <tr key={index}>
                    <td>{student.student_id}</td>
                    {Allcourses.map((id, index) => {
                      const courseData = student.courses.find((c) => c.course_id == id.course_id);
                      return (
                        <React.Fragment key={index}>
                          {nextApprovedlevel=="RB" || nextApprovedlevel=="AR" || nextApprovedlevel=="Dean" ?<td>{courseData ? courseData.overall_score : "-"}</td>:null}
                          <td>{courseData ? courseData.grade : "-"}</td>
                        </React.Fragment>
                      );
                    })}
                    {studentGPA.map((gpa, index) => {
                      if (gpa.student_id === student.student_id) {
                        return (
                          <React.Fragment key={index}>
                            <td>{gpa.sgpa}</td>
                            <td>{gpa.cgpa}</td>
                          </React.Fragment>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            {console.log(nextApprovedlevel)}
            
              <br />
              {nextApprovedlevel === "AR" && newSignature !== null ? 
                <div>
                <h5>Certified Correct,</h5>
                <img src={newSignature} style={{ width: '80px', height: '40px' }}  />
                <p>Ms H.H Kaumadi Dharmasiri</p>
                <p>Assistant Registrar</p>
                <p>Faculty of Technology</p>
                </div>
              : null}

             

              {nextApprovedlevel === "Dean"  ? 
                <>
                   {ARSign.signature !== null || ARSign.signature !== "" ?
                   <>
                 
                   <h5>Certified Correct,</h5>
                   <img src={ARSign.signature} style={{ width: '80px', height: '40px' }} />
                   <p>Ms H.H Kaumadi Dharmasiri</p>
                   <p>Assistant Registrar</p>
                   <p>Faculty of Technology</p>
                   <br/><br/>
                 </>:null}
                  

                  {newSignature !== null?
                  <>
                    <img src={newSignature} style={{ width: '80px', height: '40px' }}  />
                    <p>Prof. P.K.S.C Jayasinghe</p>
                    <p>Dean/Faculty of Technology</p>
                  </>:null}

                  </>
                 : null}

                {nextApprovedlevel === "VC"  ? 
                    <>
                    {ARSign.signature !== null || ARSign.signature !== "" ?
                   <>
                 
                   <h5>Certified Correct,</h5>
                   <img src={ARSign.signature} style={{ width: '80px', height: '40px' }} />
                   <p>Ms H.H Kaumadi Dharmasiri</p>
                   <p>Assistant Registrar</p>
                   <p>Faculty of Technology</p>
                   <br/><br/>
                 </>:null}
                    {DeanSign.signature !== null || DeanSign.signature !== "" ?
                      <div>
                      <img src={DeanSign.signature} style={{ width: '80px', height: '40px' }}/>
                      <p>Prof. P.K.S.C Jayasinghe</p>
                      <p>Dean/Faculty of Technology</p>
                      <br/><br/>
                      </div>:null}

                      {newSignature !== null?

                      <div>
                      <img src={newSignature} style={{ width: '80px', height: '40px' }} />
                      <p>Snr Prof. Sujeewa Amarasena</p>
                      <p>Vice Chancellor</p>
                      <p>Faculty of Technology</p>
                      <br/>
                      </div>:null}
                    </>
                  : null}

            
          </div>

          
          <div style={{float:"right",marginTop:"50px"}}>
          <SignatureForApproval saveDigitalSignature={saveDigitalSignature} />
          </div>
          

          <form onSubmit={handleSubmit}>
            <input
              to={``}
              type="submit"
              value="Send"
              className="btn btn-outline-success btn-sm"
              id="submitbtn"
              disabled={!newSignature}
              style={{
                width: "10%",
              }} />
            <br />
            <br />
          </form>
          
        </>
      ) : (
        <div className=" container" style={{ marginTop: "150px" }}>
          <div className="alert alert-primary" role="alert"> {`No Result sheets found for  level ${level} and semester ${semester} to Approve`}</div>
           
            <br />

          </div>
       
      )}
    </div>
  );
}
