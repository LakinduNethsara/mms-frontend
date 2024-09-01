import axios from "axios";

class ARService {
    static BASE_URL = "http://192.248.50.155:9090";

    static async getViewMarksCourseList(level,semester,department_id) {     // API call to fetch course data
        try {
            const response = await axios.get(`${ARService.BASE_URL}/api/AssistantRegistrar/getViewMarksCourseList/${level}/${semester}/${department_id}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    static async getCourseListRemainingToAddToResultBoard(level,semester,department_id,result_board_id){
        try{
            const courseList = await axios.get(`${ARService.BASE_URL}/api/AssistantRegistrar/getCourseListRemainingToAddToResultBoard/${level}/${semester}/${department_id}/${result_board_id}`); //Get the course list that can be added to the result board from the database
        }
        catch(err){
            toast.error(err.response.data.errorMessage,{autoClose:3000}); //Display the error message if an error occurs

        }
    }


}

export default ARService;

