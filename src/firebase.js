import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBQN-iJE7EJ-gWQM7HFLZvxzLTpfFZOXkg",
    authDomain: "medicare-76456.firebaseapp.com",
    projectId: "medicare-76456",
    storageBucket: "medicare-76456.appspot.com",
    messagingSenderId: "857231676879",
    appId: "1:857231676879:web:9e182bbd34b7a212396eba",
    measurementId: "G-66N9GCD0QM"
};

const app = firebase.initializeApp(firebaseConfig);
const mess = firebase.messaging();

export const getToken = async () => {
    try {
        const token = await mess.getToken({ vapidKey: "BHMSykK9tySrUcvDKEFnCdXFANcL9XWT7Jdlxldte_MPmQzSswl7GjnVLQ8P5jKJWkut0diNIwppbHqBNcAumoQ" });
        localStorage.setItem("firebase", token);
        return token;
    } catch (err) {
        console.log(err);
        return err;
    }
}



mess.onMessage((payload) => {
    console.log("RecivedForgroung messaga", payload);
})



export const onMessageListener = () => {
    new Promise((resolve) => {
        mess.onMessage((payload) => {
            console.log(payload);
            resolve(payload);
        });
    })
};