import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { fetchAcademicYear, loadAcademicYearFromLocal, saveAcademicYearToLocal } from '../../../services/academicYearService';
import Navbar from './Navbar';

export default function CourseCard(props) {

    const[cidN,setCidN]=useState([
        {
            course_id: '',
            course_name: ''
        }
    ])
    
    const history = useHistory();

    const[errorMsg,seterrorMsg]=useState("");
    const{level,semester,department}=useParams();
    const{approved_level}=props;
    const [academicDetails, setAcademicDetails] = useState(loadAcademicYearFromLocal);
    const[academicYear,setAcademicYear]=useState("")


    console.log(level,semester,department,approved_level,academicYear)
   
  
    const result = async () => {
      try {
          const response = await axios.get(`http://localhost:9090/api/courses/getcidcnamebyls/${level}/${semester}/${department}/${approved_level}/${academicYear}`);
          const list = response.data; 
          setCidN(list.content);
          seterrorMsg(list.message);
      } catch (error) {
          if (error.response && error.response.status === 404) {
              seterrorMsg(error.response.data.message);
              setCidN([]); // Set an empty array or any default state
  
          } else {
             seterrorMsg('An error occurred:', error);
          }
      }
  };
  
    
    useEffect(() => {
        result();
       }, [level,semester,department,approved_level,academicYear]); // This effect runs whenever level or semester changes

       

       useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/courses/getcidcnamebyls/${level}/${semester}/${department}/${approved_level}/${academicYear}`);
                const data = response.data;
                if (data && data.content) {
                    setCidN(data.content);
                    seterrorMsg(data.message);
                } else {
                    seterrorMsg('No Marks Return Sheets For Approval');
                    setCidN([]);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    seterrorMsg(error.response.data.message);
                    setCidN([]);
                } else {
                    seterrorMsg('An error occurred:', error);
                }
            }
        };

        fetchData();
    }, [level, semester, department, approved_level, academicYear]);
      
       
       useEffect(() => {
        const fetchAndSaveYear = async () => {
          const details = await fetchAcademicYear();
          if (details) {
            saveAcademicYearToLocal(details);
            setAcademicDetails(details);
            setAcademicYear(details.current_academic_year)
          }
        };
    
        fetchAndSaveYear();
      }, []);

       return (
        <>
           <div className="row" style={{marginTop:"70px", padding:"2%"}}>
            <Navbar/>
             {
               cidN && cidN.length > 0 ? (
                 cidN.map((courseInfo, index) => (
                   <div
                     className="card border-primary mb-3 mx-lg-3 shadow"
                     style={{ maxWidth: '18rem', cursor: 'pointer' }}
                     key={index}
                     onClick={() => history.push(`/HODMarksReturnSheet/${courseInfo.course_id}/${courseInfo.course_name}/${department}`)}
                   >
                     <div className="card-header">Course code : {courseInfo.course_id}</div>
                     <div className="card-body">
                       <h5 className="card-title">{courseInfo.course_name}</h5>
                     </div>
                   </div>
                 ))
               ) : (
                <div className=' container' style={{ marginTop: '150px' }}>
                <div className="alert alert-primary" role="alert">
                  {errorMsg}
                </div>
                </div>
               )
             }
           </div>
        </>
       );
       
           
}
