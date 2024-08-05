
import React from 'react'

export default function CCProfile() {
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
                                <h5 className="card-title py-2">Marks Approval</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a href="/ccmarksapproval"  className="btn btn-primary btn-sm mt-2">To Approval</a>
                            </div>
                        </div>
                        <div className="card shadow m-4" style={{width: "18rem"}}>
                            <div className="card-body ">
                                <h5 className="card-title py-2">View CA Eligibility</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a href="/viewcaeli"  className="btn btn-primary btn-sm mt-2">To View</a>
                            </div>
                        </div>
                        {/* <div className="card shadow m-4" style={{width: "18rem"}}>
                            <div className="card-body ">
                                <h5 className="card-title py-2">View FA Eligibility</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/attendencesysan"  className="btn btn-primary btn-sm mt-2">Go somewhere</a>
                            </div>
                        </div> */}
                    </div>
                    
                    <div className='row g-3 my-4'>
                        <div className="card shadow m-4" style={{width: "18rem"}}>
                            <div className="card-body ">
                                <h5 className="card-title py-2">Courses Criteria</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a href="/cccbycc"  className="btn btn-primary btn-sm mt-2">To Create</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
