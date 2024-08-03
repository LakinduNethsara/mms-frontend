import React, { useState, useEffect } from 'react';
import { IoMenuSharp } from 'react-icons/io5';

function Navbar() {
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

    const logout = () => {
        localStorage.removeItem('user');
        window.location.href="/";
    }

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                {
                    user != null ? <IoMenuSharp size="35"/>:null
                }
                <a className="navbar-brand" href="#">
                    <img src="src/assets/LOGO_OF_RUHUNA-removebg-preview.png" alt="Logo" width="17" height="24" className="d-inline-block align-text-top"/>
                    &nbsp;&nbsp;Faculty of Technology | UOR
                </a>
                {
                    user != null?<button type="button" onClick={logout} className="btn btn-outline-dark btn-sm" style={{widows:"100px"}}>LOGOUT</button>:null
                }
                
            </div>
        </nav>
    );
}

export default Navbar;
