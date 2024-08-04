import axios from "axios";

class LecturerService {
    static BASE_URL = "http://localhost:9090";

    static async getEvaluationCriteriaCA(course_id) {
        try {
            const response = await axios.get(`${LecturerService.BASE_URL}/api/evaluationCriteriaName/getAssessmentType/${course_id}/CA`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getNotAddStudentsID(course_id) {
        try {
            const response = await axios.get(`${LecturerService.BASE_URL}/api/studentRegCourses/getMarksNotEnteredStudent/${course_id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllRelatedStudentID(course_id) {
        try {
            const response = await axios.get(`${LecturerService.BASE_URL}/api/studentRegCourses/getallregstudents/${course_id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async insertCAMarks(caMarks) {
        try {
            await axios.post(`${LecturerService.BASE_URL}/api/StudentAssessment/inputCAMarks`,caMarks);
        } catch (err) {
            throw err;
        }
    }

}

export default LecturerService;
