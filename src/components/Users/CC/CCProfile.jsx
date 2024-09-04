
import React from 'react'


export default function CCProfile() {
  return (
    <div className=' container' style={{marginTop:"140px"}}>
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
                                <a href="/lec_related_course_fa"  className="btn btn-primary btn-sm mt-2">To Marks Form</a>
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


                    <div className='row g-3'>
                        <div className="card shadow m-4" style={{width: "18rem"}}>
                            <div className="card-body ">
                                <h5 className="card-title py-2">Marks Approval</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a href="/pendingCCCertifyMarksheet"  className="btn btn-primary btn-sm mt-2">To Approval</a>
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

                        <div className="card shadow m-4" style={{width: "18rem"}}>
                            <div className="card-body ">
                                <h5 className="card-title py-2">Results Board</h5>
                                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                <a href="/ccresultsboard"  className="btn btn-primary btn-sm mt-2">To Results Board</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
  )
}
