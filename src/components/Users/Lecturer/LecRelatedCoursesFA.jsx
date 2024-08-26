import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function LecRelatedCoursesFA() {
    const [courses, setCourses] = useState([])
    const storedData = localStorage.getItem('user');
    const [email,setEmail] =useState(); 
    const history = useHistory();
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        if(storedData){

            
            
            setEmail(JSON.parse(storedData).email);
        }else{
            
            setEmail(null);
        }
        fetchCourses();
    }, [email])


    const fetchCourses = async () => {
        setLoader(true);
        const res = await axios.get(`http://localhost:9090/api/courses/getccregcourses/${email}`)
        setCourses(res.data.content);
        setLoader(false);
    }
  return (
    <div>
        {loader ? ( 

                    
<div style={{margin:"100px",display:"flex"}}>

    <div class="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    <div className=' h4 mx-3' style={{color:"maroon"}}>Data is Loading...</div>
</div>


) : (<>
        <div className='container' style={{marginTop:"70px"}}>
            <h2>Related Courses</h2>
            <div className='row g-3 my-4'>
                {courses.map((course, index) => (
                    <div className="card shadow m-4" style={{width: "18rem"}} key={index}>
                        <div className="card-body">
                            <h5 className="card-title py-2">{course[1]}</h5> 
                            <h6 className='card-title py-1'>{course[2]}</h6> 
                            {/* {console.log(course[1],course[2])}  */}
                            <a className="btn btn-primary btn-sm mt-2" onClick={ ()=> history.push(`/fa_addby_lec/${course[1]}/${course[2]}`)}>To FA Eligibility</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>)} 
    </div>
  )
}
