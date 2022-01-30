import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
})

export const signUpDoctor = async (doc) => {
    try {
        console.log("from")
        console.log(doc);

        let res = await api.post('doctor/signup', doc);
        console.log(res.status);
    } catch (err) {
        console.log(err);
    }


}

export const logInDoctor = (email, password) => {
    api.post('doctor/login', { email, password }).then(data => {
        console.log(data.data.token);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('data', JSON.stringify(data.data.doc));
    }).catch(err => {
        console.log(err.message);
    })
}