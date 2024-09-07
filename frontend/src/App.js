import Home from './Components/Home';
import React,{createContext,useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './Components/Createpost';
import { Logincontext } from './context/Logincontext';
import Modal from './Components/Modal';
import Userprofile from './Components/Userprofile';


function App() {
  const [userlogin, setuserlogin] = useState(false);
  const [modalopen, setmodalopen] = useState(false);
  return (
    <BrowserRouter>
     <div className="App">
      <Logincontext.Provider value={{setuserlogin, setmodalopen}}>
      <Navbar login={userlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
        <Route path='/profile/:userid' element={<Userprofile/>}></Route>
        <Route path='/createpost' element={<Createpost/>}></Route>
      </Routes>
      <ToastContainer theme='dark'/>
      {/* <Modal></Modal> */}
      {modalopen &&  <Modal setmodalopen={setmodalopen}></Modal>}
      </Logincontext.Provider>
    </div>
    </BrowserRouter>
   
  );
}

export default App;
