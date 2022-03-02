import './App.css';
import { AppRouter } from './router/router';
import { onMessageListener, getToken } from './firebase';
import { useEffect, useState } from 'react';
import { sendfirebasetoken } from './services/genralservice'
import { Videocall } from './copmonents/video/video';

function App() {
  alert("hello");
  const [show, setShow] = useState(false);
  useEffect(async () => {
    try {
      const token = await getToken();
      if (token) {
        console.log("token : ", token);
        if(localStorage.getItem('token')){
          sendfirebasetoken({token});
        }
      }
    } catch (err) {
      console.log(err);
    }

  }, [])
  
  // onMessageListener()
  // .then((payload) => {
  //   setShow(true);
  //   console.log(payload);
  // })
  // .catch((err) => console.log("failed: ", err));

  return (
    <>
    <AppRouter />
    <Videocall />
    </>
    
  );
}

export default App;
