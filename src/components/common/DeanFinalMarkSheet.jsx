import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import SignatureForApproval from './SignatureForApproval';
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from './AcademicYearManagerSingleton';
import DateObject from 'react-date-object';
import BackButton from '../Users/AR/BackButton/BackButton';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function DeanFinalMarkSheet(props) {
  const [headersList, setHeadersList] = useState([]);
  const[data,setData]=useState([])
  const [loading, setLoading] = useState(false);
  const [finalResults, setFinalResults] = useState([]);
  const [repeatersfinalResults, setRepeatersFinalResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [repeatercourses, setrepeatersCourses] = useState([]);
  const [repeatstudents, setrepeatStudents] = useState([]);
  const { level, semester, dept,academic_year } = useParams();
  const [studentGPA, setStudentGPA] = useState([]);
  const [repeat_studentGPA, setRepeatStudentGPA] = useState([]);
  const history = useHistory();
  const [error, setError] = useState("");
  const { approved_level } = props;
  const [newSignature, setNewSignature] = useState();
  const [nextApprovedlevel, setNextApprovedlevel] = useState("");
  const [degree,setDegree]=useState("");
  const[Allcourses,setAllCourses]=useState([]);
  var date = new DateObject({
    date: new Date(),
  });

  const [user, setUser] = useState({
        
  });

  const userNameAuth = user?.full_name;
  const role=user?.role;

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

  console.log(ARSign)

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
    "academic_year": academic_year,
    "date_time": date.format(),
    "department_id": dept,
    "signature": newSignature
  };

  

  const storedData = localStorage.getItem('user');
  useEffect(() => {
      if(storedData){
          setUser(JSON.parse(storedData));
      }else{
          setUser(null);
      }
      if (dept === "ICT") {
        setDegree("Bachelor of Information and Communication Technology Honours Degree");
    } else if (dept === "BST") {
        setDegree("Bachelor of Bio Systems Technology Honours Degree");
    } else if (dept === "ET") {
        setDegree("Bachelor of Engineering Technology Honours Degree");
    }

    
  }, []);
 
  
  


    useEffect(() => {
      setLoading(true);
      if (user) {
        fetchData();
        // fetchCourses();
      }
      setLoading(false)
    }, [level, semester, dept,approved_level]);


    const headers = [
      ...Allcourses.map(course => ({ label: course.course_id, key: 'courses', subKeys: ['overall_score', 'grade'] })),
      { label: 'SGPA', key: 'sgpa' },
      { label: 'CGPA', key: 'cgpa' }
    ];
    
   console.log(headers);
    

 


    const fetchData = async () => {
      try {
         const nextLevelMap = {
          "RB": "AR",
          "AR": "Dean",
          "Dean": "VC"
        };
        setNextApprovedlevel(nextLevelMap[approved_level] || "");
  
        // Fetch final results
        const finalResultsResponse = await axios.get(
          `http://localhost:9090/api/studentMarks/GetApprovedMarksByLS/${level}/${semester}/${approved_level}/${dept}/0`
        );
        const finalResultsData = finalResultsResponse.data.content;
  
        const processedFinalResults = finalResultsData.reduce((acc, curr) => {
          const existingStudent = acc.find(student => student.student_id === curr.student_id);
          if (existingStudent) {
            existingStudent.courses.push({
              course_id: curr.course_id,
              overall_score: curr.total_rounded_mark,
              grade: curr.grade,
            });
          } else {
            acc.push({
              student_id: curr.student_id,
              courses: [
                {
                  course_id: curr.course_id,
                  overall_score: curr.total_rounded_mark,
                  grade: curr.grade,
                },
              ],
            });
          }
          return acc;
        }, []); // Initializing acc as an empty array
  
        setFinalResults(processedFinalResults);



        
  
        // Fetch courses
        const coursesResponse = await axios.get(
          `http://localhost:9090/api/courses/getcidcnamebydls/${dept}/${level}/${semester}`
        );
        setAllCourses(coursesResponse.data);
  
        // Fetch GPA
        const gpaResponse = await axios.get(
          `http://localhost:9090/api/gpa/GetGPAByLevelSemester/${level}/${semester}/${approved_level}/${dept}/0`
        );
        setStudentGPA(gpaResponse.data.content);
        console.log(gpaResponse.data.content)
  
        // Fetch repeaters data
        const repeatersResponse = await axios.get(
          `http://localhost:9090/api/studentMarks/GetApprovedMarksByLS/${level}/${semester}/${approved_level}/${dept}/1`
        );
        const repeaterData = repeatersResponse.data.content;
  
        const processedRepeaterData = repeaterData.reduce((acc, curr) => {
          const existingStudent = acc.find(student => student.student_id === curr.student_id);
          if (existingStudent) {
            existingStudent.courses.push({
              course_id: curr.course_id,
              overall_score: curr.total_rounded_mark,
              grade: curr.grade,
            });
          } else {
            acc.push({
              student_id: curr.student_id,
              courses: [
                {
                  course_id: curr.course_id,
                  overall_score: curr.total_rounded_mark,
                  grade: curr.grade,
                },
              ],
            });
          }
          return acc;
        }, []); // Initializing acc as an empty array
  
        setRepeatersFinalResults(processedRepeaterData);
        
  
        const repeatersgpa = await axios.get(
          `http://localhost:9090/api/gpa/GetGPAByLevelSemester/${level}/${semester}/${approved_level}/${dept}/1`
        );
        setRepeatStudentGPA(repeatersgpa.data.content);
  
        
       

        
        
      
      } catch (error) {
        console.error('Error fetching data:', error);
       
      }
    };
  
  
  console.log(headers)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Declare response
      const response = await axios.post(`http://localhost:9090/api/approvalLevel/updateApprovalLevelByDean`, approval);
      
      if (response.data.code === "00") {
        toast.success("Result sheet approved successfully");
        setTimeout(() => {
          history.goBack();
        }, 1000);
      } else {
        // Handle case where response code is not "00"
        toast.error("Failed to approve the result sheet.");
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.error("Network error: ", error);
        toast.error("Network error. Please check your network connection.");
      } else {
        console.error("Error updating approval level: ", error);
        toast.error("Failed to update approval level.");
      }
    }
  };
  

  const saveDigitalSignature = (url) => {
    setNewSignature(url);
  };


    
    const fetchSignature = async () => {
      setLoading(true);
      try {
        // Fetch AR signature
        const ARSignatureResponse = await axios.get(
          `http://localhost:9090/api/approvalLevel/getSignature/${level}/${semester}/${dept}/AR/${academic_year}`
        );
  
        if (ARSignatureResponse.status === 200) {
          const ARSignatureData = ARSignatureResponse.data.content;
          setARSign(ARSignatureData || {});
          console.log(ARSignatureData?.signature);
        } else {
          // Handle the failure of AR signature fetching
          // toast.error('Failed to fetch AR signature.');
        }
  
        // Fetch Dean signature
        const DeanSignatureResponse = await axios.get(
          `http://localhost:9090/api/approvalLevel/getSignature/${level}/${semester}/${dept}/Dean/${academic_year}`
        );
  
        if (DeanSignatureResponse.status === 200) {
          const DeanSignatureData = DeanSignatureResponse.data.content;
          setDeanSign(DeanSignatureData || {});
          console.log(DeanSignatureData?.signature);
        } else {
          // Handle the failure of Dean signature fetching
          // toast.error('Failed to fetch Dean signature.');
        }
  
      } catch (error) {
        if (error.response) {
          // Error handling for server response errors
          console.error('Error fetching signature data:', error.response);
          // toast.error(`Error ${error.response.status}: ${error.response.data.message || 'Something went wrong.'}`);
        } else {
          // Error handling for other errors
          console.error('Error fetching signature data:', error.message);
          // toast.error('An unexpected error occurred while fetching signature data.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchSignature();
    }, [level, semester, dept, academic_year]); // Dependencies
  
  


    

  
  


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

const downloadPDF = () => {
  const generatePDF = (results, gpaResults, fileName) => {
    if (results.length > 0 || gpaResults.length > 0) {
      const doc = new jsPDF('p', 'pt', 'A4');

      // University and Faculty Header
      doc.setFontSize(10);
      doc.text('University of Ruhuna', 297.5, 40, null, null, 'center');
      doc.text('Faculty of Technology', 297.5, 60, null, null, 'center');
      doc.setFontSize(9);
      doc.text('Bachelor of Information and Communication Technology Honours Degree', 297.5, 80, null, null, 'center');
      doc.text('Level 1 Semester 1', 297.5, 100, null, null, 'center');
      doc.text('Academic Year 2023-2024', 297.5, 120, null, null, 'center');
      doc.setFontSize(8);
      doc.text('Provisional results subject to confirmation by the Senate', 297.5, 140, null, null, 'center');

      // Key to Grading & Course List Section
      let positionY = 160;
      doc.setFontSize(8);
      doc.setFont("Arial", "bold");
      doc.text("Key to Grading", 297.5, positionY, null, null, 'center');
      positionY += 10;

      const gradingKey = [
        ["A+", "4.00", "A", "4.00"],
        ["A-", "3.70", "B+", "3.30"],
        ["B", "3.00", "B-", "2.70"],
        ["C+", "2.30", "C", "2.00"],
        ["C-", "1.70", "D+", "1.30"],
        ["D", "1.00", "E", "0.00"],
        ["F", "CA Fail"],
        ["MC", "Accepted Medical Certificate"],
        ["AC", "Accepted Academic Concession"],
        ["WH", "Results Withheld"],
        ["E*", "Not Eligible/Not Applied/Absent without Medical"]
      ];

      gradingKey.forEach((row, index) => {
        doc.setFont("Arial", "normal");
        doc.text(row[0], 140, positionY + (index + 1) * 10);
        doc.text(row[1], 190, positionY + (index + 1) * 10);
        if (row[2]) {
          doc.text(row[2], 280, positionY + (index + 1) * 10);
          doc.text(row[3], 330, positionY + (index + 1) * 10);
        }
      });

      positionY += gradingKey.length * 10 + 20;

      doc.setFontSize(8);
      doc.setFont("Arial", "bold");
      doc.text("Course List", 297.5, positionY, null, null, 'center');
      positionY += 10;

      Allcourses.forEach((course, index) => {
        doc.setFont("Arial", "normal");
        doc.text(`${course.course_id} - ${course.course_name}`, 297.5, positionY + (index + 1) * 10, null, null, 'center');
      });

      positionY += Allcourses.length * 10 + 20;

      // Prepare and add student data tables
      const rowsPerPage = 50;
      const allData = [];
      const headers = [
        'Student ID',
        ...Allcourses.map(course => course.course_id),
        'SGPA',
        'CGPA'
      ];

      results.forEach((student) => {
        const studentRow = [student.student_id];
        
        Allcourses.forEach(course => {
          const courseData = student.courses.find(c => c.course_id === course.course_id);
          studentRow.push(courseData ? courseData.grade : "-");
        });

        const studentGPAResult = gpaResults.find(g => g.student_id === student.student_id);
        studentRow.push(studentGPAResult ? studentGPAResult.sgpa : "-");
        studentRow.push(studentGPAResult ? studentGPAResult.cgpa : "-");

        allData.push(studentRow);
      });

      for (let i = 0; i < allData.length; i += rowsPerPage) {
        const slicedData = allData.slice(i, i + rowsPerPage);

        doc.autoTable({
          head: [headers],
          body: slicedData,
          startY: positionY,
          margin: { top: positionY, bottom: 40, left: 20, right: 20 },
          theme: 'striped',
          styles: { fontSize: 7 },
          headStyles: { fillColor: [220, 220, 220] },
          tableWidth: 'wrap',
          columnStyles: {
            0: { cellWidth: 50 },
            [Allcourses.length]: { cellWidth: 40 },
            [Allcourses.length + 1]: { cellWidth: 40 }
          }
        });

        if (i + rowsPerPage < allData.length) {
          doc.addPage();
        }
      }

      positionY = doc.lastAutoTable.finalY + 10;

      // Add Signatures
      const signatureWidth = 60;
      const signatureHeight = 30;

      if (ARSign.signature) {
        doc.setFontSize(7);
        doc.text("Certified Correct,", 40, positionY);
        doc.addImage(ARSign.signature, 'PNG', 40, positionY + 10, signatureWidth, signatureHeight);
        doc.text("Assistant Registrar", 40, positionY + 45);
        doc.text("Faculty of Technology", 40, positionY + 55);
      }

      if (DeanSign.signature) {
        doc.addImage(DeanSign.signature, 'PNG', 220, positionY + 10, signatureWidth, signatureHeight);
        doc.text("Dean/Faculty of Technology", 220, positionY + 45);
      }

      doc.text("Vice Chancellor", 420, positionY + 80);
      doc.text("Faculty of Technology", 420, positionY + 90);

      doc.save(fileName);
    }
  };

  // Generate PDF for final results
  generatePDF(finalResults, studentGPA, `Level ${level} Semester  ${semester} Department of Level ${dept} -Proper.pdf`);

  // Generate PDF for repeaters' final results
  generatePDF(repeatersfinalResults, repeat_studentGPA, `Level ${level} Semester  ${semester} Department of Level ${dept} -Repeaters.pdf`);
};









const Spinner = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="spinner-border" role="status">
      <span className="sr-only visually-hidden">Loading...</span>
    </div>
  </div>
);





if(loading){
  return (
  <Spinner />
  );
}
  




  return (
    <div className="container" style={{marginTop:'70px'}}>
      <ToastContainer/>
      {loading ? (
                  <Spinner/>
            ) : (
              <>
      <BackButton />
      {((finalResults.length > 0 && studentGPA.length>0)  ||(repeatersfinalResults.length>0 && repeat_studentGPA.length>0)) ? (

        <>
        
        {
        role == "dean" && approved_level == "HOD" ? (
          <button
            className="btn btn-outline-success"
            style={{ float: "right" }}
            onClick={() => history.push(`/changesGradeMargin`)}
          >
            Change Grade Margin
          </button>
        ) : null}
        {
        approved_level == "Dean" ? (
          <button
            className="btn btn-outline-success"
            style={{ float: "right" }}
            onClick={() => downloadPDF()}
          >
            Download
          </button>
        ) : null}
        
         <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2 style={{ marginBottom: '5px', fontFamily: 'Arial, sans-serif', color: '#333' }}>University of Ruhuna</h2>
          <h2 style={{ marginBottom: '5px', fontFamily: 'Arial, sans-serif', color: '#333' }}>Faculty of Technology</h2>
          <h5 style={{ marginBottom: '5px', fontFamily: 'Arial, sans-serif', color: '#555' }}>{degree}</h5>
          <h5 style={{ marginBottom: '5px', fontFamily: 'Arial, sans-serif', color: '#555' }}>Level {level}     Semester {semester}     <br/>    Academic year {formatAcademicYear(academic_year)}</h5>
          <h5 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', color: '#777' }}>Provisional results subject to confirmation by the Senate</h5>
        </div>


          <div className=' shadow-lg col-12 container' style={{display:'flex',fontSize:'12px'}}>

          <div
            className=" col-7 "
            style={{
              fontSize: '14px',
              padding: '10px',
              margin: '20px',
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
            <table className=' table table-responsive-sm' style={{ borderCollapse: 'collapse',fontSize:'12px'}}>
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
              marginLeft: '40px',
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
    
        {finalResults.length > 0  && studentGPA.length>0 ?(

          <div className="">
            <table className="overflow-x-scroll table border shadow table-hover" style={{ marginTop: "60px" }}>
              <thead>
                <tr>
                  <th scope="col" className='table-info'>Student ID</th>
                  
                  {
                  Allcourses.map((id, index) => (
                    <React.Fragment key={index}>
                      <th className=' table-secondary'>{id.course_id}</th>
                      {nextApprovedlevel=="RB" || nextApprovedlevel=="AR" || nextApprovedlevel=="Dean" || approved_level=="HOD" ?<th className=' table-primary'>Grade</th>:null}
                      
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
                          {nextApprovedlevel=="RB" || nextApprovedlevel=="AR" || nextApprovedlevel=="Dean" || approved_level=="HOD" ?<td>{courseData ? courseData.overall_score : "-"}</td>:null}
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
        ):null}

          {repeatersfinalResults.length>0 && repeat_studentGPA.length>0 ?

            <div className="">
              <h5>Repeaters </h5>
            <table className="overflow-x-scroll table border shadow table-hover" style={{ marginTop: "60px" }}>
              <thead>
                <tr>
                  <th scope="col" className='table-info'>Student ID</th>
                  {Allcourses.map((id, index) => (
                    <React.Fragment key={index}>
                      <th className=' table-secondary'>{id.course_id}</th>
                      {nextApprovedlevel=="RB" || nextApprovedlevel=="AR" || nextApprovedlevel=="Dean" || approved_level=="HOD" ?<th className=' table-primary'>Grade</th>:null}
                    </React.Fragment>
                  ))}
                  <th scope="col" className=' table-warning'>SGPA</th>
                  <th scope="col" className=' table-success'>CGPA</th>
                </tr>
              </thead>
              <tbody>
                {repeatersfinalResults.map((student, index) => (
                  <tr key={index}>
                    <td>{student.student_id}</td>
                    {Allcourses.map((id, index) => {
                      const courseData = student.courses.find((c) => c.course_id == id.course_id);
                      return (
                        <React.Fragment key={index}>
                          {nextApprovedlevel=="RB" || nextApprovedlevel=="AR" || nextApprovedlevel=="Dean" || approved_level=="HOD" ?<td>{courseData ? courseData.overall_score : "-"}</td>:null}
                          <td>{courseData ? courseData.grade : "-"}</td>
                        </React.Fragment>
                      );
                    })}
                    {repeat_studentGPA.map((gpa, index) => {
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
          :null
          }


          

          <div className=' row mt-5' style={{display:"flex"}}>

          

          <div className=' col-4 '>
            {console.log(nextApprovedlevel)}
            
              <br />
              {nextApprovedlevel === "AR" && newSignature !== null ? 
                <div>
                <h5>Certified Correct,</h5>
                <img src={newSignature} style={{ width: '80px', height: '40px' }}  />
                <p></p>
                <p>Assistant Registrar</p>
                <p>Faculty of Technology</p>
                </div>
              : null}

             

              {nextApprovedlevel === "Dean"  ? 
                <>
                   {ARSign.signature !== null || ARSign.signature !== "" ?
                   <>
                 {console.log(ARSign.signature)}
                   <h5>Certified Correct,</h5>
                   <img src={ARSign.signature} style={{ width: '80px', height: '40px' }} />
                   <p></p>
                   <p>Assistant Registrar</p>
                   <p>Faculty of Technology</p>
                   <br/><br/>
                 </>:null}
                  

                  {newSignature !== null?
                  <>
                    <img src={newSignature} style={{ width: '80px', height: '40px' }}  />
                    <p></p>
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
                   <p></p>
                   <p>Assistant Registrar</p>
                   <p>Faculty of Technology</p>
                   <br/><br/>
                 </>:null}
                    {DeanSign.signature !== null || DeanSign.signature !== "" ?
                      <div>
                      <img src={DeanSign.signature} style={{ width: '80px', height: '40px' }}/>
                      <p></p>
                      <p>Dean/Faculty of Technology</p>
                      <br/><br/>
                      </div>:null}

                      {newSignature !== null?

                      <div>
                      
                      <div>


                      </div>
                      <p></p>
                      <p>Vice Chancellor</p>
                      <p>Faculty of Technology</p>
                      <br/>
                      </div>:null}
                    </>
                  : null}

            
            </div>
            
            <div className=' col-7'>
             
              {approved_level!="HOD" && approved_level!="Dean"?<div >
              <SignatureForApproval saveDigitalSignature={saveDigitalSignature} />
              </div>:null}


              
             
           

            </div>
          
          </div>
     

          {approved_level!="HOD" && approved_level!="Dean"?  <form onSubmit={handleSubmit}>
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
          </form>:null}
         
          
        </>
      ) :null
    }
      </>
)}  

    </div>
  );
}
