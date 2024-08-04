import { Redirect } from "react-router-dom";
import BackButton from "../../../../components/Users/AR/BackButton/BackButton";
import LevelSelection from "../../../../components/Users/AR/LevelSelection/LevelSelection";


export default function ViewMarks(props) {
  
  var department_id = props.department_id;




  return (
    <div>
       
        
        {/* <NavebarAR/> */}
        <LevelSelection department_id={department_id} level_selection_tpe={"View student marks"}/>

        <div className='col'>
            <div className='right-aligned-div back-button-div' style={{marginRight:'20px',marginTop:"10px"}}>
              <BackButton/> <br/>&nbsp;
            </div>
        </div>
    </div>
  )
}
