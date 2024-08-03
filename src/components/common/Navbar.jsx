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
                    user != null ? 
                    
                        <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"  role="button" aria-controls="offcanvasExample">
                            <IoMenuSharp size="35"/>
                        </a>                    
                    :null
                }
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                        </div>
                        <div className="dropdown mt-3">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
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
