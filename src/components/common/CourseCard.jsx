import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

export default function CourseCard(props) {

    const[cidN,setCidN]=useState([
        {
            course_id: '',
            course_name: '',
            department_id:'',
            academicYear:''
        }
    ])
    
    const history = useHistory();
    const[current_semester,setCurrent_semester]=useState("");
    const[errorMsg,seterrorMsg]=useState("");
    const{level,semester,department}=useParams();
    const{approved_level}=props;
   
 

       useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/courses/getcidcnamebyls/${level}/${semester}/${department}/${approved_level}`);
                
                if (response.data && response.data.content) {
                  const data = response.data.content.map(course => ({
                    course_id: course[0],
                    course_name: course[1],
                    department_id: course[2],
                    academicYear: course[3]
                }));
                
                    setCidN(data);
                    console.log(cidN)
                } else {
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
    }, [level, semester, department, approved_level]);
      
       
      

       return (
        <>
           <div className="row" style={{marginTop:"70px", padding:"2%"}}>
           
             {
               cidN && cidN.length > 0 ? (
                 cidN.map((courseInfo, index) => (
                   <div
                     className="card border-primary mb-3 mx-lg-3 shadow"
                     style={{ maxWidth: '18rem', cursor: 'pointer' }}
                     key={index}
                     onClick={() => history.push(`/HODMarksReturnSheet/${courseInfo.course_id}/${courseInfo.course_name}/${courseInfo.department_id}/${courseInfo.academicYear}`)}
                   >
                     <div className="card-header">Course code : {courseInfo.course_id}</div>
                     <div className="card-body">
                       <h5 className="card-title">{courseInfo.course_name}</h5>
                       <h5 className="card-title">{courseInfo.department_id} department</h5>
                       <h5 className="card-title">Academic year : {courseInfo.academicYear} </h5>
                     </div>
                   </div>
                 ))
               ) : (
                <div className=' container' style={{ marginTop: '150px' }}>
                <div className="alert alert-primary" role="alert">
                  <h4>No Marks Return Sheet for Approval</h4>
                </div>
                </div>
               )
             }
           </div>
        </>
       );
       
           
}
