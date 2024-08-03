import React, { useState } from 'react';

export default function DeanDashBoard() {


return(
  <>
          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <a href="/pendingDeanCertifyMarksheet" className="btn btn-primary home-page-class-button">Certify Result Sheets</a>
              </div>
            </div>
          </div>

          <div className="col mb-4"> 
            <div className="card text-center functionCard">
              <div className="card-body">
                <a href="" className="btn btn-primary home-page-class-button">Results Board</a>
              </div>
            </div>
          </div>
  </>
)

}
