import React from 'react'

export default function CCDashBoard() {
  return (
    <div>
        <div className=' container' style={{marginTop:"70px"}}>
            <div className=' py-4'>
                <div style={{display:"flex"}}>
                    <h2>Hello,</h2>
                    {/* Display user's username */}
                    <h4 className=' pt-2 mx-3'>...</h4> 
                </div> 
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                <div className=' center' >
                    <div className='row g-3'>
                        <div className="card shadow m-4" style={{width: "18rem"}}>
                            <div className="card-body ">
                                <h5 className="card-title py-2">Marks Approval</h5>
                                <a href="/ccmarksapproval"  className="btn btn-primary btn-sm mt-2">To Approval</a>
                            </div>
                        </div>
                        <div className="card shadow m-4" style={{width: "18rem"}}>
                            <div className="card-body ">
                                <h5 className="card-title py-2">View CA Eligibility</h5>
                                <a href="/viewcaeli"  className="btn btn-primary btn-sm mt-2">To View</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className='row g-3 my-4'>
                        <div className="card shadow m-4" style={{width: "18rem"}}>
                            <div className="card-body ">
                                <h5 className="card-title py-2">Courses Criteria</h5>
                                <a href="/cccbycc"  className="btn btn-primary btn-sm mt-2">To Manage</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
