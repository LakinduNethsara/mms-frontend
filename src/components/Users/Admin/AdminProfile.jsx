import React from 'react'

export default function AdminProfile() {
  
  return (
    <div className="container m-5">
      <div className="row justify-content-center">

        <div className="col col-6 shadow p-4" style={{marginLeft:"40px",borderRadius:"10px"}}>

          <h2 className=' mb-3'>Admin Profile</h2>

          <div className="mb-3 row">
            <label  className="col-sm-2 col-form-label">User ID</label>
            <div className="col-sm-10">
              <input type="text"  className="form-control"  />
            </div>
          </div>

          <div className="mb-3 row">
            <label  className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text"  className="form-control"  />
            </div>
          </div>

          <div className="mb-3 row">
            <label  className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="mb-3 row">
            <label  className="col-sm-2 col-form-label">Department</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" />
            </div>
          </div>

        </div>

        <div className="col col-5 shadow p-4" style={{marginLeft:"60px",borderRadius:"10px"}}>

          <h5 className=' mt-3'>Change Password</h5>
          <div className="mb-3 row mt-3">
            <label  className="col-sm-4 col-form-label">Current Password</label>
            <div className="col-sm-7">
              <input type="password" className="form-control" />
            </div>
          </div>

          <div className="mb-3 row">
            <label  className="col-sm-4 col-form-label">New Password</label>
            <div className="col-sm-7">
              <input type="password" className="form-control" />
            </div>
          </div>

          <div className="mb-3 row">
            <label  className="col-sm-4 col-form-label">Confirm Password</label>
            <div className="col-sm-7">
              <input type="password" className="form-control" />
            </div>
          </div>

        </div>
      </div>
  </div>
  )
}





