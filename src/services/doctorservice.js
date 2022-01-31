import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
})


api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        console.log(token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)


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

export const updateDoctor = async (props) => {
    try {
       //console.log(props);
       const data = await api.patch('doctor',props);
       //console.log(data);
      //return;
      return data;
    } catch (err) {
       // console.log(err.response);
        return err.response;
    }

}

export const updateuserdataLocalStorage = (props) => {
    localStorage.removeItem('data');
    console.log(props);
    localStorage.setItem('data',JSON.stringify(props));   
}


