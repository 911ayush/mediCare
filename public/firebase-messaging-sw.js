
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBQN-iJE7EJ-gWQM7HFLZvxzLTpfFZOXkg",
    authDomain: "medicare-76456.firebaseapp.com",
    projectId: "medicare-76456",
    storageBucket: "medicare-76456.appspot.com",
    messagingSenderId: "857231676879",
    appId: "1:857231676879:web:9e182bbd34b7a212396eba",
    measurementId: "G-66N9GCD0QM"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

});