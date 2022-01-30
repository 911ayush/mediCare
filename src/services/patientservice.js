import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
})

export const signUpPatient = async (doc) => {
    try {
        console.log("from")
        console.log(doc);

        let res = await api.post('patient/signup', doc);
        console.log(res.status);
    } catch (err) {
        console.log(err.message);
    }


}

export const logInPatient = (email, password) => {
    api.post('patient/login', { email, password }).then(data => {
        console.log(data.data.token);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('data', JSON.stringify(data.data.doc));
    }).catch(err => {
        console.log(err.message);
    })
}

export const getPatients = async () => {
    try {
        const patients = await api.get('patient');
        console.log(patients.data);
    } catch (err) {
        console.log(err.message);
    }


}