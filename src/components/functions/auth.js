import axios from 'axios';

export const register = async (value) =>
    await axios.post(process.env.REACT_APP_API + '/register', value);

export const adduser = async (value) =>
    await axios.post(process.env.REACT_APP_API + '/adduser', value);

export const login = async (value) =>
    await axios.post(process.env.REACT_APP_API + '/login', value);

export const currentUser = async (authtoken) => {

    return await axios.post(process.env.REACT_APP_API + '/current-user', {},
        {
            headers: {
                authtoken,
            }
        });
}
export const currentTeacher = async (authtoken) => {

    return await axios.post(process.env.REACT_APP_API + '/current-teacher', {},
        {
            headers: {
                authtoken,
            }
        });
}

export const currentAdmin = async (authtoken) => {

    return await axios.post(process.env.REACT_APP_API + '/current-admin', {},
        {
            headers: {
                authtoken,
            }
        });
}