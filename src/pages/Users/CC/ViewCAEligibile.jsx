import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function ViewCAEligibile() {
    const [courses, setCourses] = useState([]);
    const history = useHistory();
    const storedData = localStorage.getItem('user');
    const [email,setEmail] =useState();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if(storedData){
            
            setEmail(JSON.parse(storedData).email);
        }else{
            
            setEmail(null);
        }
        
        fetchData();
    }, [email]);

    const fetchData = async () => {
        
        try {
            setLoader(true);

            console.log(email)

            const response = await axios.get(`http://192.248.50.155:9090/api/courses/getccregcourses/${email}`);
            if (response.data.code !== '00') {
                throw new Error('Network response was not ok');
            }
            const data = response.data.content;
            setCourses(data);
            console.log(data)
        
            setLoader(false);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            console.error('Error details:', error.response);
        }
    };
  return (
    <div>
        {loader ? ( 

            <div style={{margin:"100px",display:"flex"}}>

                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className=' h4 mx-3' style={{color:"maroon"}}>Data is Loading...</div>
            </div>


            ) : (<>

        <div className='container' style={{marginTop:"70px"}}>
            <div className='row g-3 my-4'>
                {courses.map((course, index) => (
                    <div className="card shadow m-4" style={{width: "18rem"}} key={index}>
                        <div className="card-body">
                            <h5 className="card-title py-2">{course[1]}</h5> 
                            <h6 className='card-title py-1'>{course[2]}</h6> 
                                {/* {console.log(course.course_id,course.course_name)}  */}
                            <a className="btn btn-primary btn-sm mt-2" onClick={ ()=> history.push(`/caeli/${course[1]}/${course[2]}`)}>To CA Eligibility</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>)} 
    </div>
  )
}
