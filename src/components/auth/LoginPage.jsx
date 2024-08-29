import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import Typed from 'typed.js';
import { ToastContainer, toast } from 'react-toastify';

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const el = useRef(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["MARKS MANAGEMENT SYSTEM", "FACULTY OF TECHNOLOGY", "UNIVERSITY OF RUHUNA"],
            typeSpeed: 30,
            loop: true,
            loopCount: Infinity,
            cursorChar: "|"
        });
        return () => {
            typed.destroy();
        };
    }, []);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const credentials = {
            email: email,
            password: password
        };

        try{
            const response = await axios.post('http://192.248.50.155:9090/api/user/login',credentials);
            
            console.log(response.data.content);

            localStorage.setItem('user',JSON.stringify(response.data.content));
            if(response.data.content.role === "admin"){
                window.location.href = "/admin_profile";
            }else if(response.data.content.role === "cc"){
                window.location.href = "/cc_profile";
            }else if(response.data.content.role === "system_analyst"){
                window.location.href = "/system_analyst_profile";
            }else if(response.data.content.role === "dean"){
                window.location.href = "/dean_profile";
            }else if(response.data.content.role === "hod"){
                window.location.href = "/hod_profile";
            }else if(response.data.content.role === "ar"){
                window.location.href = "/ar_profile";
            }else if(response.data.content.role === "vc"){
                window.location.href = "/vc_profile";
            }else if(response.data.content.role === "student"){
                toast.warning("Students are not authorized to login here");
                window.href ="/";
                // window.location.href = "/st_profile";
            }else if(response.data.content.role === "lecturer"){
                window.location.href = "/lec_profile";
            }
            else{
                
                window.location.href = "/";
            }
            setLoader(false);
        }catch(error){
            toast.error("Invalid User Credentials");
            console.log(error);
        }
        
        
    }
    const handleCancle = ()=>{
        setEmail('');
        setPassword('');
    }

    return(
        <div className="" style={{marginTop:"10%"}}>
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-3">
                        <img src="src/assets/LOGO_OF_RUHUNA-removebg-preview.png" className="img-fluid" alt="UOR logo"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <h3 className="fw-bold">
                    {" "}
                        <span ref={el} />{" "}
                    </h3>
                        <h1 className="fw-bold mb-3 pb-3">LOGIN</h1>

                        <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        <label htmlFor="floatingInput">Email Address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                        </div>

                        {/* <!-- Submit button --> */}
                        <div className=' mt-3'>
                            {loader ? ( 

                                <div class="spinner-border spinner-border-sm" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                    <button type="submit" className="btn btn-outline-dark btn-sm " style={{width:"100PX"}}>LOGIN</button>
                                )}
                            
                            <button type="button" className="btn btn-outline-danger btn-sm mx-3" style={{width:"100PX"}} onClick={handleCancle}>CANCEL</button>
                        </div>

                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}

export default LoginPage;