import './App.css';
import { AppRouter } from './router/router';


function App() {
  // const fun = () =>{
  //   navigator.geolocation.getCurrentPosition((position)=>{
  //     console.log(position.coords.latitude);
  //   })
  //   console.log("yess");
  // }
  return (
    <AppRouter />
  );
}

export default App;
