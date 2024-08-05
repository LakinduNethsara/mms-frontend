import React from 'react'

export default function LecturerProfile() {
  
  return (
    
      <div className=' container' style={{marginTop:"70px"}}>
            <div className=' py-4'>
                    <div style={{display:"flex"}}>
                    </div> 
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                    <div className=' center' >
                        <div className='row g-3'>
                            <div className="card shadow m-4" style={{width: "18rem"}}>
                                <div className="card-body ">
                                    <h5 className="card-title py-2">Add CA Marks</h5>
                                    <p className="card-text">Click this button for access to the CA Marks feeding form</p>
                                    <a href="/lec_related_course"  className="btn btn-primary btn-sm mt-2">To Marks Form</a>
                                </div>
                            </div>
                            <div className="card shadow m-4" style={{width: "18rem"}}>
                                <div className="card-body ">
                                    <h5 className="card-title py-2">Add FA Marks</h5>
                                    <p className="card-text">Click this button for access to the FA Marks feeding form</p>

                                    <a href="/viewcaeli"  className="btn btn-primary btn-sm mt-2">To Marks Form</a>
                                </div>
                            </div>
                            <div className="card shadow m-4" style={{width: "18rem"}}>
                                <div className="card-body ">
                                    <h5 className="card-title py-2">Course Coordinate</h5>
                                    <p className="card-text">Click this button for access to the Course Coordinate Page </p>

                                    <a href="/cc_profile"  className="btn btn-primary btn-sm mt-2">To The Page</a>
                                </div>
                            </div>
                        </div>
                        
                        {/* <div className='row g-3 my-4'>
                            <div className="card shadow m-4" style={{width: "18rem"}}>
                                <div className="card-body ">
                                    <h5 className="card-title py-2">Courses Criteria</h5>
                                    <a href="/cccbycc"  className="btn btn-primary btn-sm mt-2">To Create</a>
                                </div>
                            </div>
                        </div> */}
                        
                    </div>
                </div>
            </div>
  )
}
