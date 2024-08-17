class Role_Authentication {
    static isSystem_Analyst(){
        const role = (JSON.parse(localStorage.getItem('user'))).role;
        return role === 'system_analyst'
    }

    static isLecturer(){
        const role = (JSON.parse(localStorage.getItem('user'))).role;
        if(role === null)
        {
            return false;
        }
        return role === 'lecturer'
    }

    static isHOD(){
        const role = (JSON.parse(localStorage.getItem('user'))).role;
        return role === 'hod'
    }


    static isDean(){
        const role = (JSON.parse(localStorage.getItem('user'))).role;
        return role === 'dean'
    }


    static isAR(){
        const role = (JSON.parse(localStorage.getItem('user'))).role;
        return role === 'ar'
    }

    static isStudent(){
        const role = (JSON.parse(localStorage.getItem('user'))).role;
        return role === 'student'
    }

    static isVC(){
        const role = (JSON.parse(localStorage.getItem('user'))).role;
        return role === 'vc'
    }
}

export default Role_Authentication;