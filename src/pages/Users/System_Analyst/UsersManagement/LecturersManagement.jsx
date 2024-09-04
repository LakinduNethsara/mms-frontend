import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditUserModal from './EditUserModal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LecturersManagement() {
    const [showPassword, setShowPassword] = React.useState(false); // This is a state variable to toggle password visibility
    const [users, setUser] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [user, setUserDetails] = useState({
        user_id: "",
        full_name: "",
        name_with_initials: "",
        email: "",
        password: "",
        registered_year: "",
        role: "",
        department_id: "",
        is_deleted: false
    });

    const [refreshKey, setRefreshKey] = useState(Date.now());

    useEffect(() => {
        loadUsers();
    }, [refreshKey]);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:9090/api/lecreg/get/allusersdetails");
        setUser(result.data.content);
        console.log(result.data.content);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:9090/api/lecreg/delete/deleteById/${id}`);
        toast.success("User deleted successfully!");
        loadUsers();
    };

    const fullNameConvertToInitial = (fullname) => {
        if (typeof fullname !== 'string' || fullname.trim() === '') return '';
        const getfullname = fullname.split(' ');
        if (getfullname.length === 0) return '';
        const namewithinitials = getfullname.slice(0, -1).map(n => n[0].toUpperCase()).join('. ') + ' ' + getfullname[getfullname.length - 1];
        return namewithinitials;
    }

    const onInputChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!user.user_id || !user.full_name || !user.registered_year || !user.role || !user.email || !user.department_id || !user.password) {
            toast.error("Please fill out all fields.");
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const updatedUser = { ...user, name_with_initials: fullNameConvertToInitial(user.full_name) };
        console.log(updatedUser)
        await axios.post("http://localhost:9090/api/lecreg/savelecdetails", updatedUser);

        setUserDetails({
            user_id: "",
            full_name: "",
            name_with_initials: "",
            email: "",
            password: "",
            registered_year: "",
            role: "",
            department_id: "",
            is_deleted: ""

        });

        setRefreshKey(Date.now());
        toast.success("User details submitted successfully!");
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleEditSubmit = async (updatedUser) => {

            await axios.put(`http://localhost:9090/api/lecreg/edit/alecdetails`, updatedUser);

            setRefreshKey(Date.now());
            toast.success("User details updated successfully!");

    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };


    const clearDataWindow = () => {
        setUserDetails({
            user_id: "",
            full_name: "",
            name_with_initials: "",
            email: "",
            password: "",
            registered_year: "",
            role: "",
            department_id: "",
            is_deleted: ""
        });
    }


    return (
        <div className='container' style={{marginTop:"70px"}}>
            <div className='row'>
                <div className='col-md-12 mt-2 mb-3  shadow p-4'>
                    <h2 className='text-center m-4'>Register Academics & Non-Academics</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3 row '>
                            <div className='col-md-3'>
                                <label htmlFor='user_id' className='form-label'>User ID</label>
                                <input type={"text"} className='form-control' placeholder='Enter Lecturer ID' name='user_id' value={user.user_id} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='full_name' className='form-label'>Full Name</label>
                                <input type={"text"} className='form-control' placeholder='Enter Full Name' name='full_name' value={user.full_name} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='registered_year' className='form-label'>Registered Year</label>
                                <input type={"text"} className='form-control' placeholder='Enter Registered Year' name='registered_year' value={user.registered_year} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='role' className='form-label'>User Role</label>
                                <select type={"text"} className=' form-select' placeholder='Select User Role' name='role' value={user.role} onChange={(e) => onInputChange(e)} >
                                    <option value="" selected disabled>Select Role</option>
                                    <option value="lecturer">Lecturer</option>
                                    <option value="dean">Dean</option>
                                    <option value="hod">HOD</option>
                                    <option value="ar">Assistant Registrar</option>
                                    <option value="vc">Vice Chancellor</option>
                                    <option value="system_analyst">System Analyst</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <div className='col-md-3'>
                                <label htmlFor='email' className='form-label'>Email</label>
                                <input type={"text"} className='form-control' placeholder='Enter E-mail Address' name='email' value={user.email} onChange={(e) => onInputChange(e)} />
                            </div>
                            
                            {/* <div className='col-md-3'>
                                <label htmlFor='password' className='form-label'>Password</label>
                                <input type={"password"} className='form-control' placeholder='Enter Password' name='password' value={user.password} onChange={(e) => onInputChange(e)} />
                            </div> */}

                            <div className='col-md-3' style={{position:'relative'}}>
                                <label className='form-label' htmlFor="password">Password</label>
                                <input
                                    className='form-control'
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={user.password}
                                    placeholder='Enter Password'
                                    onChange={(e) => onInputChange(e)}
                                    
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        position: 'absolute',
                                        top: '72%',
                                        right: '30px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            <div className='col-md-3'>
                                {/* <label htmlFor='department_id' className='form-label'>Department</label>
                                <input type={"text"} className='form-control' placeholder='Enter Department' name='department_id' value={user.department_id} onChange={(e) => onInputChange(e)} /> */}

                                <label htmlFor='role' className='form-label'>Department</label>
                                <select type={"text"} className=' form-select' placeholder='Select a Department' name='department_id' value={user.department_id} onChange={(e) => onInputChange(e)} >
                                    <option value="" selected disabled>Select Department</option>
                                    <option value="ICT">ICT</option>
                                    <option value="ET">ET</option>
                                    <option value="BST">BST</option>
                                    <option value="Multi_Disciplinary">Multi Disciplinary</option>
                                </select>
                            </div>

                            <div className='col-md-3 d-flex align-items-end'>
                                <button type='submit' className='btn btn-outline-dark btn-sm mx-2' style={{width:"100px"}}>Submit</button>
                                {/* me cancel eka weda ne thama  */}
                                <Link className='btn btn-outline-danger mx-2 btn-sm' onClick={clearDataWindow} style={{width:"100px"}}>Cancel</Link> 
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-12'>
                    <div className='pb-5'>
                        <div id='table-wrapper'></div>
                            <div id='table-scroll' ></div>
                            <div className=' h3 ' style={{color:"maroon"}}>Academics & Non-Academics Users</div>
                                <table className="table" >
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">User ID</th>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Name with Initials</th>
                                            <th scope="col">E-mail</th>
                                            <th scope="col">Password</th>
                                            <th scope="col">Reg-Year</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Department</th>
                                            
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {users?.map((user, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{user.user_id}</td>
                                                <td>{user.full_name}</td>
                                                <td>{user.name_with_initials}</td>
                                                <td>{user.email}</td>
                                                <td>{user.password}</td>
                                                <td>{user.registered_year}</td>
                                                <td>{user.role}</td>
                                                <td>{user.department_id}</td>
                                                
                                                <td>
                                                    <button style={{width:"100px"}} className='btn btn-outline-dark btn-sm' onClick={() => openEditModal(user)}>Edit</button>
                                                    
                                                    <button style={{width:"100px"}} className='btn btn-outline-danger btn-sm mt-2' onClick={() => deleteUser(user.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                    </div>
                </div>
            </div>
            {isModalOpen && editingUser && (
                <EditUserModal user={editingUser} onSubmit={handleEditSubmit} onClose={closeEditModal} />
            )}
            <ToastContainer />
        </div>
    )
}
